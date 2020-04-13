import * as Models from "../models";

const CACHE_KEY: string = "winners";

export class Cache {
  cache: Storage = localStorage;

  get(): Models.Winners {
    const val = this.cache.getItem(CACHE_KEY);
    if (val) {
      return JSON.parse(val);
    } else {
      return {
        0: 0,
        1: 0,
      };
    }
  }

  set(value: Models.Winners): void {
    const jsonVal: string = JSON.stringify(value);
    return this.cache.setItem(CACHE_KEY, jsonVal);
  }
}

export default new Cache();
