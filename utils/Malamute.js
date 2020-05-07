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
  }

  async search(query) {
    const { getParams, parseResponse } = this._config;
    const params = getParams(query);
    const url = this._fetcher.makeHref(params);

    const cachedSearch = this._getCachedSearch(url)
    if (cachedSearch) return cachedSearch;

    const response = await this._fetcher.fetch(params);
    const items = parseResponse(response);

    this._cacheSearch(url, items);

    return items;
  }

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
    store.write([url], jsonItems);
  }
}
