<template>
  <q-layout view="lHh Lpr lFf" class="main-orbit-layout">
    <q-header elevated >
      <q-toolbar class="bg-green-9">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Orbit
        </q-toolbar-title>

        <div>Orbit v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Navigation
        </q-item-label>
        <q-item v-for="(q, i) in essentialLinks" v-bind:key="i" v-ripple clickable v-bind:to="q.to">
            <q-item-section avatar>
              <q-icon v-bind:name="q.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{q.title}}
              </q-item-label>
            </q-item-section>
          <q-separator spaced inset/>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Dashboard',
          icon: 'storage',
          to: "/"
        },
        {
          title: 'Databases',
          caption: 'no instances',
          icon: 'storage',
          to: "/databases"
        },
        {
          title: 'Cloud diagram',
          caption: 'no instances',
          icon: 'cloud_queue',
          to: '/diagram'
        },
        {
          title: 'Service monitoring',
          caption: 'no instances',
          icon: 'multiline_chart',
          to: '/services'
        },
        {
          title: 'Docs',
          caption: 'orbit.dev',
          icon: 'school',
          to: '/docs'
        },
      ]
    }
  }
}
</script>

<style type="text/css">
  .main-orbit-layout {
    color: green;
  }
</style>
