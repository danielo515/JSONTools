<template>
  <div>
    <q-select
      v-model="select"
      float-label="Keys to include"
     :options="keys"
    />
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
import Pick from 'lodash.pick'

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
    extract() {
      const result = this.input.map(o => Pick(o, this.select));
      this.$store.dispatch('setJsonOutput', result)
    }
  },
  data () {
    return {
      select: ''
    }
  }
}
</script>

<style>
</style>
