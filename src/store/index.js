import Vue from 'vue'
import Vuex from 'vuex'
import {listAllKeys, uniques, has, positiveNumber} from '../utils';

Vue.use(Vuex);

const getMetadata = (source) => {
  let elements, type;
  if (Array.isArray(source)) {
    type = 'Array of objects';
    elements = source.length;
  }
  else
  if (typeof source === 'object') {
    type = 'Object';
    elements = Object.keys(source).length;
  }
  else {
    type = 'Non valid';
    elements = 'Must be array or object';
  }

  return {elements, type}
}

export const actions = {
  setJsonInput({commit}, value) {
    commit('SET_JSON_INPUT', value);
    commit('EXTRACT_KEYS');
    commit('SET_META', {target: 'input', metadata: getMetadata(value)});
  },
  /**
   * Processing components should dispatch this action with the result of their processing of the JSON-input.
   * The payload must be an object that will be formatted according to the configuration
   * @param {*} param0 Set by vuex
   * @param {Object} obj Should be an object representing the result of processing the input
   */
  setJsonOutput({commit, state}, obj) {
    commit('SET_JSON_OUTPUT', JSON.stringify(obj, null, state.config.space))
    commit('SET_META', {target: 'output', metadata: getMetadata(obj)});
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
    state.jsonOutput = value;
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
