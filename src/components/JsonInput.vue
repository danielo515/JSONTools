<template>
  <div class="jsonInput" :class="error ? 'has-error' : ''">
    <div class="error-message" v-if="error" v-html="formatError(errorMessage)"></div>
    <codemirror @blur="blur" :options="editorOptions" :code="area"></codemirror>
  </div>
</template>

<script>
// import {
//   QField
// } from 'quasar'

import { jsonParse } from '../utils';
import { codemirror } from 'vue-codemirror'

const asyncParse = (str) => {
  return new Promise((resolve, reject) => {
    const parsed = jsonParse(str)
    if (parsed instanceof Error) {
      return reject(parsed);
    }
    resolve(parsed);
  });
}

export default {
  components: {
    codemirror
    // QField
  },
  data () {
    return {
      /* area: '{Hello:"Objects go here"}', */
      error: false,
      errorMessage: '',
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
  computed: {
    area () {
      if (this.$store.state.config.automaticFormat) return this.$store.getters.inputText
      return null;
    }
  },
  methods: {
    blur (evt) {
      this.parse(evt.doc.getValue())
    },
    formatError: (str) =>
      str.startsWith('Unexpected') ? str.replace(/(Unexpected token )(.)/, '$1"<span style="color:red">$2</span>"') : str,
    parse (text) {
      if (!text) {
        return;
      }
      asyncParse(text)
        .then((parsed) => {
          this.error = false;
          this.errorMessage = '';
          parsed = Array.isArray(parsed) ? parsed : [parsed];
          this.$store.dispatch('setJsonInput', parsed);
        })
        .catch((err) => {
          this.error = true;
          this.errorMessage = err.message;
        })
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'
  .jsonInput
    height 100%
    position relative
    .error-message
      width 100%
      background-color $dimmed-background
      color white
      position absolute
      padding .1em 2em
      z-index $z-side
      text-align right
</style>
