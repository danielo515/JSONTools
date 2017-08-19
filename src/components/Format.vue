<template>
  <div>
    <q-field icon="format align right" label="Spacing" error-label="Must be a number">
      <q-input prefix="Spacing" type="number" :value="spacing" @blur="spacing = $event.target.value" />
    </q-field>
    <q-btn @click="expand">Expand</q-btn>
    <q-btn @click="collapse">Collapse</q-btn>
  </div>
</template>

<script>
import {
  QBtn,
  QField,
  QInput
} from 'quasar'

export default {
  components: {
    QBtn,
    QField,
    QInput
  },
  computed: {
    jsonInput () {
      return this.$store.state.jsonInput;
    },
    spacing: {
      get () { return this.$store.state.config.space },
      set (val) { this.$store.dispatch('setSpacingFormat', val) }
    }
  },
  methods: {
    expand () {
      this.spacing = Math.max(1, this.spacing);
      this.$store.dispatch('setJsonOutput', this.jsonInput)
    },
    collapse () {
      this.spacing = 0;
      this.$store.dispatch('setJsonOutput', this.jsonInput)
    }
  },
  data () {
    return {}
  }
}
</script>

<style>

</style>
