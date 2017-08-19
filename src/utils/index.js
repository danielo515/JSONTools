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

export const objHas = (prop) => (obj) => obj.hasOwnProperty(prop);
export const arrHas = (prop) => (arr) => arr.indexOf(prop) !== -1;
export const has = (prop) => (col) => IF(isArray, arrHas(prop), objHas(prop))(col);
