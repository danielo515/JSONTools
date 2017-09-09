<template>
  <div class="jsonInput" :class="error ? 'has-error' : ''">
    <div class="error-message" v-if="error" v-html="formatError(errorMessage)"></div>
    <Editor language="json" :code="inputText" theme="vs" srcPath="" width="100%" height="100%" :blur="blur" :options="monacoOptions">
    </Editor>
  </div>
</template>

<script>

import { jsonParse } from '../utils';
import Editor from '@/Editor';

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
    Editor
  },
  data () {
    return {
      error: false,
      errorMessage: '',
      monacoOptions: {
        folding: true,
        readOnly: false,
        overviewRulerBorder: false,
        theme: 'vs-dark'
      }
    }
  },
  computed: {
    inputText () {
      if (this.$store.state.config.automaticFormat) return this.$store.getters.inputText
      return null;
    }
  },
  methods: {
    blur (text) {
      this.parse(text)
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
