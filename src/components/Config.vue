<template>
  <div>
    <q-field icon="format align right" label="Spacing" error-label="Must be a number">
      <q-input type="number" :value="spacing" @blur="spacing = $event.target.value" />
    </q-field>
    <q-field icon="format align right" label="Automatic format">
      <q-toggle v-model="autoFormat" />
    </q-field>
  </div>
</template>

<script>
import {
  QBtn,
  QField,
  QInput,
  QToggle
} from 'quasar'

export default {
  components: {
    QBtn,
    QField,
    QToggle,
    QInput
  },
  computed: {
    spacing: {
      get () { return this.$store.state.config.space },
      set (val) { this.$store.dispatch('setSpacingFormat', val) }
    },
    autoFormat: {
      get () { return this.$store.state.config.automaticFormat },
      set () { this.$store.dispatch('toggleConfig', 'automaticFormat') }
    }
  },
  data () {
    return {}
  }
}
</script>

<style>

</style>>
