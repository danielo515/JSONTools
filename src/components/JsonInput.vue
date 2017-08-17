<template>
  <div class="jsonInput">
      <span :class="error ? 'has-error' : ''"></span>
      <codemirror @blur="blur" :options="editorOptions"></codemirror>
  </div>
</template>

<script>
// import {
//   QField
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
    // QField
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
      if (!text) {
        return;
      }
      asyncParse(text)
        .then((parsed) => {
          this.error = false;
          parsed = Array.isArray(parsed) ? parsed : [parsed];
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
  .jsonInput
    height 100%
</style>
