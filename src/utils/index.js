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

export const fixIfFails = (mayThrow, ...fixStrategies) => (...args) => {
  try {
    return mayThrow(...args);
  }
  catch (err) {
    if (fixStrategies.length <= 0) {
      console.info('Can not fix: ', ...args);
      return err;
    }
    const fixer = fixStrategies[0];
    return fixIfFails(mayThrow, ...fixStrategies.slice(1))(fixer(...args));
  }
}

export const summary = (...informants) => topic =>
  informants.reduce((info, i) => Object.assign(
    info,
    i(topic))
    , {});

export const asProp = prop => value => ({[prop]: value});
// general fp helpers
export const map = fn => arr => arr.map(fn);
export const get = (key, def) => col => col.hasOwnProperty(key) ? col[key] : def;
export const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// STR helpers
export const strRemove = (regex) => (str) => str.replace(regex, '$1');
export const jsonQuotes = (str) => str.replace(/'/g, '"');
export const cleanMongoDataTypes = strRemove(/\w+\(([^)]+)\)/g);
const separateObjects = (str) => '[' + str.replace(/\}[^,]*?\{/g, '},{') + ']'
const quoteWords = (str) => str.replace(/([^"])(\w+)\s*:/g, '$1"$2":')
// Applies different fixers to a json string until it parses correctly or there are no more fixes
export const jsonParse = fixIfFails((str) => JSON.parse(str), cleanMongoDataTypes, jsonQuotes, separateObjects, quoteWords);
