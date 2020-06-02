import fetcher from './fetcher';
import Store from './Store';

/**
 * @typedef {Object} StorageConfig
 * @property {'none'|'session'|'local'} type
 */

/**
 * @typedef {Object} RemoteConfig
 * @property {string} url
 * @property {Object} options
 */

/**
 * @typedef {Object} MalamuteConfig
 * @property {(item: Object) => Object} idetify Define id item to optimize stored data
 * @property {() => Object} prefetch If is defined, it will be called get parameters to prefetch.
 * @property {RemoteConfig} remote Remote config
 * @property {(query: string) => Object} request The function return is sended to request as parameters
 * @property {(res: any) => Object[]} response Parse response to get the items
 * @property {StorageConfig} storage Storage config
 */

export default class Malamute {
  /**
   * @param {MalamuteConfig} config
   */
  constructor(config) {
    const {
      remote: {
        url,
        options,
      },
      storage,
      idetify,
      request,
      response = res => res,
      prefetch,
    } = config;

    this._config = {
      idetify,
      getParams: request,
      parseResponse: response,
    }

    const storageType = storage ? storage.type : 'session';
    const store = new Store(storageType, 'Malamute');

    this._store = store;
    this._fetcher = fetcher(url, options);
    this._onSearchListeners = [];
    /**
     * @type {{ [key: string]: object[] }}
     */
    this._searches = store.readAllFrom(['search']);
    const items = JSON.parse(store.read(['items'])) || [];
        /**
     * @type {{ [key: string]: object }}
     */
    this._items = items.reduce((result, item) => ({
      ...result,
      [idetify(item)]: item,
    }), {});

    if (prefetch) {
      this._parametricSearch(prefetch());
    }
  }

  /**
   * @param {string} query 
   */
  search(query) {
    const { getParams } = this._config;
    const params = getParams(query);
    return this._parametricSearch(params);
  }

  /**
   * @param {Object} params 
   */
  async _parametricSearch(params) {
    const { parseResponse } = this._config;
    const url = this._fetcher.makeHref(params);

    const cachedSearch = this._getCachedSearch(url)
    if (cachedSearch) {
      this._callSearchListeners(cachedSearch);
      return cachedSearch;
    }

    const response = await this._fetcher.fetch(params);
    const items = parseResponse(response);

    this._cacheSearch(url, items);
    this._callSearchListeners(items);
    return items;
  }

  /**
   * @param {(items: Object[]) => void} listener 
   */
  onSearch(listener) {
    this._onSearchListeners.push(listener);
  }

  /**
   * @param {Object[]} items 
   */
  _callSearchListeners(items) {
    this._onSearchListeners.forEach(listener => listener(items));
  }

  /**
   * @param {string} url 
   */
  _getCachedSearch(url) {
    const search = this._searches[url];
    if (!search) return null;

    const searchItems = search.map((key) => {
      const item = this._items[key];
      return item;
    });

    return searchItems;
  }

  /**
   * @param {string} url 
   * @param {Object[]} items 
   */
  _cacheSearch(url, items) {
    const { idetify } = this._config;
    const store = this._store;

    // write keys list
    const keys = items.map(item => idetify(item));
    this._searches[url] = keys;
    store.write(['search', url], JSON.stringify(keys));

    // write items
    items.forEach((item) => {
      this._items[idetify(item)] = item;
    });
    const jsonItems = JSON.stringify(Object.values(this._items));
    store.write(['items'], jsonItems);
  }
}
