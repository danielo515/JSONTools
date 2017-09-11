'use strict';

import map from 'lodash/map'
import flatten from 'lodash/flatten'

const toTypeString = x => Object.prototype.toString.call(x);
const isObject = x => toTypeString(x) === '[object Object]';

const getKeys = (obj, path = []) => flatten(
  map(obj,
    (v, k) =>
      isObject(v)
        ? getKeys(v, path.concat(k))
        : path.concat(k).join('.')
  ))

export default getKeys
/* const thing = {
  a: 1,
  b:
  {
    c: 3, f: 1, g: 2
  },
  d:
  {
    f: 1,
    e:
    {
      x: 99,
      y: [1, 2],
      z: {
        f: 'o'
      }
    }
  }

};

getKeys(thing)

// output [ 'a', 'b.c', 'b.f', 'b.g', 'd.f', 'd.e.x', 'd.e.y', 'd.e.z.f' ] */
