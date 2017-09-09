<template>
  <MonacoEditor language="json" :code="code" :theme="options.theme" srcPath="" width="100%" height="100%" :options="monacoOptions" @mounted="onMounted">
  </MonacoEditor>
</template>

<script>
import MonacoEditor from 'vue-monaco-editor'

export default {
  components: {
    MonacoEditor
  },
  props: {
    code: String,
    blur: Function,
    options: {
      type: Object,
      default: {}
    }
  },
  computed: {
    monacoOptions () {
      return Object.assign({}, this.defaults, this.options)
    }
  },
  watch: {
    code (value) {
      this.editor.setValue(value);
    }
  },
  methods: {

    onMounted (editor) {
      this.editor = editor;
      editor.onDidBlurEditor(this.onBlur.bind(this));
    },
    onBlur () {
      this.blur && this.blur(this.editor.getValue());
    }
  },
  data () {
    return {
      defaults: {
        glyphMargin: false,
        showFoldingControls: 'always'
      }
    }
  }
}
</script>

<style>

</style>>
