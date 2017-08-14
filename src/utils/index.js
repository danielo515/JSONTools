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
