<template>
  <div>
    <q-field icon="cloud" label="Your Gmail" helper="Helper" :error="mailHasError" error-label="We need a valid email" :count="10">
      <q-input suffix="@gmail.com" v-model="model" />
    </q-field>
    <q-btn>Submit</q-btn>
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
  data () {
    return {}
  }
}
</script>

<style>

</style>>
