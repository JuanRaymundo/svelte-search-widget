export default class Store {
  constructor(type, prefix) {
    this._prefix = prefix;

    if(type === 'session') {
      this._store = sessionStorage;
    } else if (type === 'local') {
      this._store = localStorage;
    } else {
      this._prefix = null;
    }
  }

  read(path) {
    if (!this._store) return null;

    const key = [this._prefix, ...path].join('.');
    return this._store.getItem(key);
  }

  write(path, value) {
    if (!this._store) return null;

    const key = [this._prefix, ...path].join('.');
    this._store.setItem(key, value)
  }

  readAllFrom(path) {
    if (!this._store) return {};

    const root = [this._prefix, ...path].join('.');

    return Object
      .keys(this._store)
      .filter(key => key.startsWith(root))
      .reduce((result, key) => ({
        ...result,
        [key.slice(root.length + 1)]: JSON.parse(this._store[key]),
      }), {});
  }
}
