<template>
  <Editor :code="output" :options="editorOptions">
  </Editor>
</template>

<script>
import Editor from '@/Editor';

export default {
  components: {
    Editor
  },
  computed: {
    output () { return this.$store.state.jsonOutput }
  },
  data () {
    return {
      editorOptions: {
        readOnly: true
      }
    }
  }
}
</script>

<style>

</style>
