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
          <q-tab-panel name="ports">
            <div class="text-h4 q-mb-md">Ports</div>
            <div class="q-pa-md">
              <q-table
                style="color: white"
                card-class="bg-green-5 text-white"
                table-class="text-white-8"
                table-header-class="text-white"
                flat
                bordered
                title="Databases"
                :data="container.Ports"
                :columns="columnsPorts"
                row-key="name"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="networks">
            <div class="text-h4 q-mb-md">Networks</div>
            <div class="q-pa-md">
              <q-table
                style="color: white"
                card-class="bg-green-5 text-white"
                table-class="text-white-8"
                table-header-class="text-white"
                flat
                bordered
                title="Databases"
                :data="networks"
                :columns="columnsNetwork"
                row-key="name"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="mounts">
            <div class="text-h4 q-mb-md">Movies</div>
            <div class="q-pa-md">
              <q-table
                style="color: white"
                card-class="bg-green-5 text-white"
                table-class="text-white-8"
                table-header-class="text-white"
                flat
                bordered
                title="Databases"
                :data="container.Mounts"
                :columns="columnsMounts"
                row-key="name"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>

<script>
    export default {
        name: "DatabasesInspectModal",
      props:{
        container:{
          Ports: [],
        }
      },
      data() {
        return {
          columnsPorts: [
            {name: 'Ip', label: 'IP', field: 'IP', sortable: true},
            {name: 'PrivatePort', label: 'Private Port', field: 'PrivatePort', sortable: true},
            {
              name: 'PublicPort',
              label: 'Public Port',
              field: 'PublicPort',
              sortable: true,
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
            },
            {
              name: 'Type',
              label: 'Type',
              field: 'Type',
              sortable: true,
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
            }
          ],
          columnsNetwork: [
            {
              name: 'name',
              required: true,
              label: 'Instance name',
              align: 'left',
              field: row => row.name,
              format: val => `${val}`,
              sortable: true,
            },
            {name: 'Gateway', label: 'Gateway', field: 'Gateway', sortable: true},
            {name: 'IPAddress', label: 'IP Address', field: 'IPAddress', sortable: true},
            {
              name: 'IPPrefixLen',
              label: 'IP Prefix Length',
              field: 'IPPrefixLen',
              sortable: true,
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
            },
            {
              name: 'IPv6Gateway',
              label: 'IPv6 Gateway',
              field: 'IPv6Gateway',
              sortable: true,
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
            },
            {
              name: 'IPv6PrefixLen',
              label: 'IPv6 Prefix Length',
              field: 'IPv6PrefixLen',
              sortable: true,
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
            },
            {
              name: 'MacAddress',
              label: 'Mac Address',
              field: 'MacAddress',
              sortable: true,
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
            },
          ],
          columnsMounts:[
            {name: 'Type', label: 'Type', field: 'Type', sortable: true},
            {
              name: 'Destination',
              label: 'Destination',
              field: 'Destination',
              sortable: true,
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
            },
            {
              name: 'Mode',
              label: 'Mode',
              field: 'Mode',
              sortable: true,
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
            },
            {
              name: 'RW',
              label: 'RW',
              field: 'RW',
              sortable: true,
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
            },
            {
              name: 'Propagation',
              label: 'Propagation',
              field: 'Propagation',
              sortable: true,
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
            }
          ],
          networks: [],
          data: [],
          tab: 'mails',
          splitterModel: 20,
        }
      },
      methods:{
        networksToList(){
          for (let [name,settings] of Object.entries(this.container.NetworkSettings.Networks)){
            settings["name"]=name
            console.log(settings)

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
