import toNumber from 'lodash.tonumber';
export function listKeys(obj) {
  return Object.keys(obj);
}

export function uniques(val, i, arr) {
  return arr.indexOf(val) === i
}

export function listAllKeys(objs) {
  return objs.map(listKeys)
    .reduce((all, curr) => all.concat(curr), [])
    .filter(uniques);
}

const IF = (predicate, af, bf) => (x) => predicate(x) ? af(x) : bf(x)
const isArray = (arr) => Array.isArray(arr)

const positive = (n) => Math.max(0, n);
export const positiveNumber = (n) => positive(toNumber(n));
export const objHas = (prop) => (obj) => obj.hasOwnProperty(prop);
export const arrHas = (prop) => (arr) => arr.indexOf(prop) !== -1;
export const has = (prop) => (col) => IF(isArray, arrHas(prop), objHas(prop))(col);
