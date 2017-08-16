<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout
    ref="layout"
    view="hHh Lpr fFf"
    :left-class="{'no-shadow': true}"
    >
    <q-toolbar slot="header">

      <!-- <q-tabs slot="navigation">
                <q-route-tab slot="title" @select="$refs.layout.toggleLeft()" icon="view_quilt" to="/extract" replace hide="icon" label="About" />
              </q-tabs> -->
      <q-btn v-for="plugin in plugins" :key="plugin.name" @click="openTab(plugin.name)" flat>
        <q-icon :name="plugin.icon" />
      </q-btn>
    </q-toolbar>

    <q-scroll-area slot="left" style="width: 100%; height: 100%" class="bg-grey-1 no-shadow">
      <q-card flat>
        <q-card-title>
            {{tabName}}
          </q-card-title>
          <q-card-separator />
        <q-card-main>
          <router-view></router-view>
        </q-card-main>
      </q-card>

    </q-scroll-area>

    <div class="row panels" :style="computedMainStyle">
      <div class="col-6">
        <JsonInput></JsonInput>
      </div>
      <div class="col">
        <JsonOutput></JsonOutput>
      </div>
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
  QCard,
  QCardMain,
  QCardTitle,
  QCardSeparator,
  QScrollArea,
  dom,
  format
} from 'quasar'

const {capitalize} = format;

const {style} = dom;
import JsonInput from 'components/JsonInput'
import JsonOutput from 'components/JsonOutput'

export default {
  components: {
    JsonInput,
    JsonOutput,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QTabs,
    QRouteTab,
    QItem,
    QCard,
    QCardMain,
    QCardTitle,
    QCardSeparator,
    QScrollArea
  },
  data () {
    return {
      currentTab: '',
      header: { h: '0px' },
      plugins: require('../plugins').default
    }
  },
  mounted () {
    this.header.h = style(this.$refs.layout.$refs.header, 'height')
  },
  computed: {
    tabName() {
      return capitalize(this.currentTab || this.$route.path.substring(1));
    },
    computedMainStyle() {
      return { height: `calc( 100vh - ${this.header.h} )` };
    }
  },
  methods: {
    openTab (name) {
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
  .panels
    .CodeMirror
      height 100%
      width 100%
</style>
