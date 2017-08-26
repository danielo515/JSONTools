<template>
  <div>
    <q-select float-label="Operator" v-model="operator" :options="operators" />
    <div class="row" v-for="option in options" :key="option.value">
      <q-select float-label="Filter by" class="col" v-model="option.path" :options="keys" />
      <q-select float-label="Value" class="col" v-if="!!option.path" v-model="option.value" :options="getValues(option.path)" />
    </div>
    <q-btn icon="add box" flat small @click="addFilter">
      Add filter
    </q-btn>
    <q-btn @click="filter">Filter collection</q-btn>
    <q-btn @click="dedup">Remove dups</q-btn>
  </div>
</template>

<script>
import {
  QBtn,
  QSelect,
  QIcon,
  QInput
} from 'quasar'

import { mapState } from 'vuex'
import Get from 'lodash.get';
import { uniques } from 'utils';

const AND = 'and';
const OR = 'or';

const makeFilter = ({ path, value }) => {
  return (obj) => {
    return Get(obj, path) === value;
  }
};

const toString = (s) => s ? typeof s === 'string' ? s : s.toString() : '';

const simpleOption = (value) => {
  const label = toString(value) || 'None';
  return {
    label,
    value
  };
}

export default {
  components: {
    QBtn,
    QSelect,
    QIcon,
    QInput
  },
  computed: {
    filters () {
      return this.options.map(makeFilter)
    },
    filterOperand () {
      return this.operator === AND ? 'every' : 'some';
    },
    ...mapState({
      keys: state => state.keys.map(simpleOption),
      input: state => state.jsonInput
    })
  },
  methods: {
    getValues (key) {
      return this.input
        .map(i => Get(i, key))
        .filter(uniques)
        .map(simpleOption)
    },
    addFilter () {
      this.options.push({ path: '', value: '' });
    },
    filter () {
      const filteredCollection = this.input.filter(o => this.filters[this.filterOperand](f => f(o)));
      this.$store.dispatch('setJsonOutput', filteredCollection);
    },
    dedup () {
      this.$store.dispatch('removeDuplicates')
    }
  },
  data () {
    return {
      options: [
        { path: '', value: '' }
      ],
      operators: [AND, OR].map(simpleOption),
      operator: AND
    }
  }
}
</script>

<style>

</style>
