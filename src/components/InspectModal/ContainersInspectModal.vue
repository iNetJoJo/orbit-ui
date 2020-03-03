<template>
  <div style="background-color: white">
    <q-splitter
      v-model="splitterModel"
      style="height: 50em"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
        >
          <q-tab icon="mail" label="Controls" name="controls" style="color: green"/>
          <q-tab name="ports" icon="mail" label="Ports" style="color: green"/>
          <q-tab name="networks" icon="alarm" label="Networks" style="color: green"/>
          <q-tab name="mounts" icon="movie" label="Mounts" style="color: green"/>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="controls">
            <ControlsTab :container="container" :reset-table="resetTable" :exit-modal="exitModal"/>
          </q-tab-panel>

          <q-tab-panel name="ports">
            <PortsTab :ports="container.Ports"/>
          </q-tab-panel>

          <q-tab-panel name="networks">
            <NetworksTab :networks="networks"/>
          </q-tab-panel>

          <q-tab-panel name="mounts">
            <MountsTab :mounts="container.Mounts"/>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>

<script>
  import PortsTab from "./PortsTab";
  import MountsTab from "./MountsTab";
  import NetworksTab from "./NetworksTab";
  import ControlsTab from "./ControlsTab";

  export default {
    name: "DockerContainerInspectModal",
    components: {ControlsTab, NetworksTab, MountsTab, PortsTab},
    props: {
      container: {
        Ports: Array,
        Mounts: Array,
        NetworkSettings: {
          Networks: Array
        }
      },
      resetTable: Function,
      exitModal: Function
    },
    data() {
        return {
          networks: [],
          data: [],
          tab: 'controls',
          splitterModel: 20,
        }
      },
      methods:{
        networksToList(){
          for (let [name,settings] of Object.entries(this.container.NetworkSettings.Networks)) {
            settings["name"] = name;
            console.log(settings);

            this.networks.push(settings)
          }
        }
      },
      mounted() {
          this.networksToList();
      }
    }
</script>

<style scoped>

</style>
