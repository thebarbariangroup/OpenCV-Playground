class CacheController {

  constructor () {
    this.caches = {};
    this.cvObjects = [];
  }

  getCache (base = {}, seed) {
    const id = this._getCacheId(base, seed);
    
    if (this.caches[id]) {
      return this.caches[id];
    } else {
      return this._createCache(id);
    }
  }

  _getCacheId (base, seed) {
    const unhashedData = [seed].concat(this._flattenToArray(base));

    const hashSum = unhashedData.reduce((prev, cur) => {
      return prev + this._bitwiseHash(cur);
    }, 0);

    return (hashSum & hashSum).toString(); // Convert to 32bit integer to normalize length
  }

  clear () {
    this.caches = {};
    this.cvObjects.forEach((obj) => obj.delete());
    this.cvObjects = [];
  }

  _createCache (id) {
    const group = this._getCacheObject();

    this.caches[id] = group;

    return group;
  }

  _getCacheObject () {
    return {
      use (name, definition) { // to be used to initialize a value in the cacheGroup 
        let item = this[name];

        if (!item && item !== null) {
          item = definition();
          this[name] = item;
        } else {
          return item;
        }

        // TODO: explain this
        if (item && typeof item.delete === 'function') {
          instance.cvObjects.push(item); // save for deletion
        }
        return item
      }
    };
  }

  _flattenToArray (obj) {
    let flattened = [];

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        flattened = flattened.concat(this._flattenToArray(obj[key]));
      } else {
        flattened.push(`${key}:${obj[key]}`);
      }
    });

    return flattened;
  }

  // based on https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
  _bitwiseHash (unhashed) {
    let hash = 0;

    for (let i = 0, len = unhashed.length; i < len; ++i) {
      const char = unhashed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char; // effectively, hash * 31 - hash + char
    }

    return hash;
  }
}

const instance = new CacheController();

export default instance;