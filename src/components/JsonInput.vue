<template>
  <div class="jsonInput">
    <!-- <q-input
      v-model.lazy="area"
      :error="error"
      @blur="parse"
      type="textarea"
      float-label="Textarea"
      :max-height="300"
      :min-rows="7" /> -->
      <codemirror @blur="blur" :options="editorOptions"></codemirror>
  </div>
</template>

<script>
// import {
//   // QInput
//   debounce
// } from 'quasar'

import { codemirror } from 'vue-codemirror'

const asyncParse = (str) => {
  return new Promise((resolve, reject) => {
    try {
      const parsed = JSON.parse(str);
      resolve(parsed);
    }
    catch (err) {
      reject(err);
    }
  });
}

export default {
  components: {
    codemirror
  },
  data () {
    return {
      area: '',
      error: false,
      editorOptions: {
        // codemirror options
        tabSize: 2,
        lineNumbers: true,
        line: true,
        undoDepth: 100,
        dragDrop: false,
        pollInterval: 200
      }
    }
  },
  methods: {
    blur(evt) {
      this.parse(evt.doc.getValue())
    },
    parse (text) {
      asyncParse(text)
        .then((parsed) => {
          this.error = false;
          this.$store.dispatch('setJsonInput', parsed);
        })
        .catch((err) => {
          this.error = true;
          console.error(err);
        })
    }
  }
}
</script>

<style lang="stylus">
  .CodeMirror
    height 100%
    width 100%
  .jsonInput
    height 100%
</style>
