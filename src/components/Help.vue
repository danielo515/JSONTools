<template>
  <div>
    <div>
      <p>
        This is a set of tools focused on working with
        <b>collections</b> of JSON documents. In the toolbar above you will find the different tools available.
      </p>
      <p>
        This kind of collections are present and can be extracted from NOSQL databases for example. REST APIs also use to provide such collections of objects.
      </p>
      <p>
        We accept several formats such normal
        <b>JSON arrays</b>,
        <b>MONGODb exports</b>, regular
        <b>javascript objects</b> (whithout quotes around the key/field names)
      </p>
    </div>
    <q-card-title>
      Features
    </q-card-title>
    <q-item v-for="feature in features" :key="feature.id">
      <q-item-side>
        <q-item-tile color="primary" icon="ion-android-arrow-dropright" />
      </q-item-side>
      <q-item-main>
        <q-item-tile label>{{feature.description}}</q-item-tile>
      </q-item-main>
    </q-item>
  </div>
</template>

<script>
import {
  QCardTitle,
  QItemSide,
  QItemTile,
  QItemMain,
  QItem
} from 'quasar';

import plugins from '../plugins';
import { get, map, asProp } from '../utils';

const concat = (arr = [], val) => arr.concat(val);

const getFeatures = map(get('features', []));
const addId = (obj, i) => { obj.id = i; return obj };

export default {
  components: {
    QCardTitle,
    QItemSide,
    QItemTile,
    QItemMain,
    QItem
  },
  computed: {
    features () {
      return getFeatures(plugins).reduce(concat).map(asProp('description')).map(addId);
    }
  },
  data () {
    return {}
  }
}
</script>

<style>

</style>>
