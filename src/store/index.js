import Vue from 'vue'
import Vuex from 'vuex'
import { listAllKeys, uniques } from '../utils';

Vue.use(Vuex);

export const actions = {
  setJsonInput({commit}, value) {
    commit('SET_JSON_INPUT', value);
    commit('EXTRACT_KEYS');
  },
  /**
   * Processing components should dispatch this action with the result of their processing of the JSON-input.
   * The payload must be an object that will be formatted according to the configuration
   * @param {*} param0 Set by vuex
   * @param {Object} obj Should be an object representing the result of processing the input
   */
  setJsonOutput({commit, state}, obj) {
    commit('SET_JSON_OUTPUT', JSON.stringify(obj, null, state.config.space))
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
    jsonInput: [{}],
    jsonOutput: '',
    keys: []
  }
});
