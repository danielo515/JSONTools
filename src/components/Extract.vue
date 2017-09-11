<template>
  <div>
    <q-select v-model="select" float-label="Keys to include" multiple chips :options="keys" />
    <q-btn icon="create" @click="extract">Extract fields</q-btn>
  </div>
</template>

<script>
import {
  QInput,
  QSelect,
  QBtn
} from 'quasar'

import { mapState } from 'vuex'
import Get from 'lodash/get';
import set from 'lodash/set';

export default {
  components: {
    QBtn,
    QSelect,
    QInput
  },
  computed: mapState({
    keys: state => state.keys.map(k => ({ label: k, value: k })),
    input: state => state.jsonInput
  }),
  methods: {
    extract () {
      const result = this.input.map(o => this.select.reduce((res, path) => set(res, path, Get(o, path)), {}));
      this.$store.dispatch('setJsonOutput', result)
    }
  },
  data () {
    return {
      select: []
    }
  }
}
</script>

<style>

</style>
