<template>
  <div>
    <div v-for="meta in metadata" v-bind:key="meta" v-if="meta.type">
      <q-card-title>
        Metadata about {{meta.name}}
      </q-card-title>

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
          <q-item-tile sublabel>{{meta.count}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side>
          <q-item-tile color="secondary" icon="fa-clone" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Num. duplicated elements</q-item-tile>
          <q-item-tile sublabel>{{meta.duplicates}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side>
          <q-item-tile color="tertiary" icon="fa-snowflake-o" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>Weird keys</q-item-tile>
          <q-item-tile sublabel>
            <q-chip v-for="weird in getWeirdKeys(meta)" :key="weird.name" square color="primary">
              {{weird.name}}
              <q-chip small class="nested-chip">{{weird.count}}</q-chip>
            </q-chip>
          </q-item-tile>
        </q-item-main>
      </q-item>
    </div>
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
  QChip,
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
    QChip,
    QCardSeparator
  },
  computed: {
    metadata () {
      const meta = this.$store.state.metadata;
      const names = Object.keys(meta)
      return names.map(name => ({ name, ...meta[name] }));
    }
  },
  methods: {
    getWeirdKeys (meta) {
      return meta.keys
        .filter(k => k.weird)
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus">
  .nested-chip
    height 15px
    padding 4px 9px
    margin-left .5em
</style>
