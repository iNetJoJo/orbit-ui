<template>
  <div>
  <q-tabs
    v-model="tab"
    inline-label
    :breakpoint="0"
    align="left"
    class="bg-grey-2 text-green shadow-2"
  >
    <q-tab v-for="(q, i) in mainTabs" v-bind:key="i" :name="q.name" :icon="q.icon" :label="q.label" />
  </q-tabs>
    <q-tab-panels v-model="tab">
    <q-tab-panel name="containers">
      Containers
    </q-tab-panel>
    <q-tab-panel name="images">
      Images
    </q-tab-panel>
    <q-tab-panel name="networks">
      Netowks
    </q-tab-panel>
    </q-tab-panels>
  </div>
</template>


<script>
  import {mdiCubeOutline, mdiNetworkRouter, mdiImageSearch} from '@quasar/extras/mdi-v4'

    export default {
        name: "Docker",
      data(){
          return{
            mainTabs: [
              {
                name: 'containers',
                icon: mdiCubeOutline,
                label: "Containers"
              },
              {
                name: 'images',
                icon: mdiImageSearch,
                label: "Images"
              },
              {
                name: 'networks',
                icon: mdiNetworkRouter,
                label: "Networks"
              }
            ],
            tab: 'containers'
          }
      }
    }
</script>

<style scoped>

</style>
