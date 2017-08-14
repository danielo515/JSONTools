<template>
      <codemirror :code="output" :options="editorOptions"></codemirror>
</template>

<script>
import {
  QScrollArea
} from 'quasar'

import { codemirror } from 'vue-codemirror'

export default {
  components: {
    QScrollArea,
    codemirror
  },
  computed: {
    output() { return this.$store.state.jsonOutput }
  },
  data () {
    return {
      editorOptions: {
        // codemirror options
        tabSize: 2,
        lineNumbers: true,
        line: true,
        theme: 'paraiso-light',
        readOnly: true
      }
    }
  }
}
</script>

<style>
</style>
