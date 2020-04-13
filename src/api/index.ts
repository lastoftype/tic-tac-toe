import * as Models from "../models";
import { default as ApiCache } from "./cache";

const INITIAL_STATE = {
  0: 0,
  1: 0,
};

class ApiService {
  cache = ApiCache;

  get(): Models.Winners {
    const val = this.cache.get();
    if (!val) {
      this.cache.set(INITIAL_STATE);
    }

    return this.cache.get();
  }

  set(index: number): Models.Winners {
    const val: Models.Winners = this.get();
    const newVal = {
      ...val,
      [index]: val[index] += 1,
    };

    this.cache.set(newVal);
    return newVal;
  }

  tally(playerIndex: number): Models.Winners {
    return this.set(playerIndex);
  }
}

export default new ApiService();
