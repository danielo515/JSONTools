<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout">
    <q-toolbar slot="header">

      <!-- <q-tabs slot="navigation">
            <q-route-tab slot="title" @select="$refs.layout.toggleLeft()" icon="view_quilt" to="/extract" replace hide="icon" label="About" />
          </q-tabs> -->
      <q-btn flat outline @click="openTab('extract')">
        <q-icon name="menu" />
      </q-btn>
      <q-btn flat outline @click="openTab('alarm')">
        <q-icon name="alarm" />
      </q-btn>

    </q-toolbar>

    <q-scroll-area slot="left" style="width: 100%; height: 100%" class="bg-grey-1 no-shadow">
      <q-item>

        <router-view></router-view>
      </q-item>
    </q-scroll-area>

    <div class="row">
      <div class="col">

        <JsonInput></JsonInput>
      </div>
      <div class="col"></div>
    </div>

  </q-layout>
</template>

<script>

import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QTabs,
  QRouteTab,
  QItem,
  QScrollArea
} from 'quasar'

import JsonInput from 'components/JsonInput'

export default {
  components: {
    JsonInput,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QTabs,
    QRouteTab,
    QItem,
    QScrollArea
  },
  data() {
    return {
      currentTab: ''
    }
  },
  methods: {

    openTab(name) {
      const layout = this.$refs.layout;
      if (name === this.currentTab) {
        return layout.toggleLeft();
      }
      layout.showLeft();
      this.currentTab = name;
      this.$router.push(name);
    }
  }
}
</script>


<style  lang="stylus">
  @import '~variables'
</style>
