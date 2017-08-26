import Vue from 'vue'
import Vuex from 'vuex'
import {listAllKeys, uniques, has, positiveNumber, objHas, summary, asProp} from '../utils';

Vue.use(Vuex);

const getKeysMeta = (keys, collection) => keys
  .map(k => {
    const count = collection.filter(objHas(k)).length;
    return {
      count,
      weird: (count !== collection.length),
      name: k
    }
  }
  );
// Encapsulates any value in an object at the given prop

const asTypeProp = asProp('type');
const asCountProp = asProp('count');
const asDupProp = asProp('duplicates');
// This are NOT general purpose functions. They are biased towards our particular scenario
const getType = x => asTypeProp(Array.isArray(x) ? 'Array of objects' : typeof x === 'object' ? 'Object' : 'Not valid type');
const getCount = x => asCountProp(Array.isArray(x) ? x.length : typeof x === 'object' ? Object.keys(x) : 'Must be an array or object');
const isInCol = (item, collection) => collection.some(v => JSON.stringify(v) === item) ? 1 : 0;
const findDuplicates = collection => asDupProp(collection.reduce((duplicates, current, i) => duplicates + isInCol(JSON.stringify(current), collection.slice(i + 1)), 0))
const removeDuplicates = collection => collection.filter((val, i) => !isInCol(JSON.stringify(val), collection.slice(i + 1)));

const getMetadata = summary(getType, getCount, findDuplicates);

export const actions = {
  removeDuplicates({commit, state}) {
    const deduped = removeDuplicates(state.jsonInput)
    commit('SET_JSON_OUTPUT', deduped);
    commit('SET_META', {
      target: 'output',
      metadata: {
        ...getMetadata(deduped),
        keys: []
      }
    });
  },
  setJsonInput({commit, state}, value) {
    commit('SET_JSON_INPUT', value);
    commit('EXTRACT_KEYS');
    commit('SET_META', {
      target: 'input',
      metadata: {
        ...getMetadata(value),
        keys: getKeysMeta(state.keys, value)
      }
    });
  },
  /**
   * Processing components should dispatch this action with the result of their processing of the JSON-input.
   * The payload must be an object that will be formatted according to the configuration
   * @param {*} param0 Set by vuex
   * @param {Object} obj Should be an object representing the result of processing the input
   */
  setJsonOutput({commit, state}, obj) {
    commit('SET_JSON_OUTPUT', obj)
    commit('SET_META', {
      target: 'output',
      metadata: {
        ...getMetadata(obj),
        keys: []
      }
    });
  },
  setSpacingFormat({commit}, value) {
    value = Math.min(10, positiveNumber(value));
    commit('SET_CONFIG', {confSection: 'space', value});
  }
};

const mutations = {
  SET_JSON_INPUT(state, value) {
    state.jsonInput = value;
  },
  SET_JSON_OUTPUT(state, value) {
    state.jsonOutput = JSON.stringify(value, null, state.config.space);
  },
  EXTRACT_KEYS(state) {
    const keys = listAllKeys(state.jsonInput);
    state.keys = keys.filter(uniques);
  },
  SET_CONFIG(state, {confSection, value}) {
    if (!has(confSection)(state.config)) {
      return console.error('Trying to set a non existing configuration')
    }
    state.config[confSection] = value;
  },
  SET_META(state, {target, metadata}) {
    if (!state.metadata.hasOwnProperty(target)) {
      return console.error('Trying to set a non allowed metadata: ' + target);
    }
    state.metadata[target] = metadata;
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  mutations,
  state: {
    config: {
      space: 2
    },
    metadata: {
      input: {},
      output: {}
    },
    jsonInput: [{}],
    jsonOutput: '',
    keys: []
  }
});
