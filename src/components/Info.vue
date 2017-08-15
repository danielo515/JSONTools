<template>
<div>
  <q-card v-for="meta in metadata" v-bind:key="meta" v-if="meta.type">
    <q-card-title>
      Metadata about {{meta.name}}
    </q-card-title>
    <q-list >
      <q-item>
        <q-item-side>
          <q-item-tile color="primary" icon="code" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Type</q-item-tile>
          <q-item-tile sublabel>{{meta.type}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side>
          <q-item-tile color="secondary" icon="format list numbered" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Num. of elements</q-item-tile>
          <q-item-tile sublabel>{{meta.elements}}</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
  </q-card>
</div>
</template>

<script>
import {
  QList,
  QItem,
  QItemSide,
  QItemMain,
  QItemTile,
  QCard,
  QCardTitle,
  QCardSeparator
} from 'quasar'

export default {
  components: {
    QList,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile,
    QCard,
    QCardTitle,
    QCardSeparator
  },
  computed: {
    metadata() {
      const meta = this.$store.state.metadata;
      const names = Object.keys(meta)
      return names.map(name => ({name, ...meta[name]}));
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
