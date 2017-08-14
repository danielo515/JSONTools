<template>
  <div>
    <q-input v-model="area" :error="error" @blur="parse" type="textarea" float-label="Textarea" :max-height="200" :min-rows="7" />
  </div>
</template>

<script>
import {
  QInput
} from 'quasar'

export default {
  components: {
    QInput
  },
  data () {
    return {
      area: '',
      error: false
    }
  },
  methods: {
    parse () {
      try {
        const parsed = JSON.parse(this.area);
        this.error = false;
        this.$store.dispatch('setJsonInput', parsed);
      }
      catch (err) {
        this.error = true;
        console.error(err);
      }
    }
  }
}
</script>

<style>

</style>
