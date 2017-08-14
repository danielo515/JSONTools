import Vue from 'vue'
import Vuex from 'vuex'
import { listAllKeys, uniques } from '../utils';

Vue.use(Vuex);

export const actions = {
  setJsonInput({commit}, value) {
    commit('SET_JSON_INPUT', value);
    commit('EXTRACT_KEYS');
  }
};
const mutations = {
  SET_JSON_INPUT(state, value) {
    state.jsonInput = value;
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
    jsonInput: [{}],
    keys: []
  }
});
