<template>
  <q-page>
    <div class="q-pa-md">
      <q-btn-group>
        <q-btn class="bg-green-5 text-white" label="Add instance" icon-right="add" @click="add_DBInstance = !add_DBInstance"/>
<!--        <q-btn class="bg-green-5 text-white"  label="Second" />-->
<!--        <q-btn class="bg-green-5 text-white"  label="Third" />-->
<!--        <q-btn class="bg-green-5 text-white"  label="Fourth" />-->
      </q-btn-group>
    </div>
  <div class="q-pa-md">
    <q-table
      style="color: white"
      card-class="bg-green-5 text-white"
      table-class="text-white-8"
      table-header-class="text-white"
      flat
      bordered
      title="Databases"
      :data="data"
      :columns="columns"
      row-key="name"
      @row-click="openContainerDetails"
    />
  </div>
<!--    Show dialog for adding new instance-->
    <q-dialog
      v-model="add_DBInstance"
      full-width
    >
     <DatabasePickerModal v-bind:existing-databases="data" :reload-table="getDatabases"/>
    </q-dialog>
<!--    Shows db instance info-->
    <q-dialog v-model="show_DBInstanceInfo" full-width>
      <DatabasesInspectModal :container="chosen_container"/>
    </q-dialog>
  </q-page>
</template>

<script>
  import 'boot/axios';
  import { Cookies } from 'quasar'
  import DatabasesInspectModal from "../components/Databases/InspectModal/DatabasesInspectModal";
  import DatabasePickerModal from "../components/Databases/PickerModal/DatabasePickerModal";
  import RestAPI from "../lib/backend-rest/RestAPI";
  import notifications from "../lib/Notification/notifications";

    export default {
        name: "Databases",
      components: {DatabasePickerModal, DatabasesInspectModal},
      data(){
          return{
            start_when_created: false,
            show_logs_when_created: false,
            add_DBInstance: false,
            show_DBInstanceInfo: false,
            chosen_container: null,
            columns: [
              {
                name: 'name',
                required: true,
                label: 'Instance name',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: true,
              },
              { name: 'type', align: 'center', label: 'Type', field: 'type', sortable: true },
              { name: 'type', align: 'center', label: 'Version', field: 'version', sortable: true },
              { name: 'size', label: 'Size (gb)', field: 'state', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
              { name: 'status', label: 'Status', field: 'status', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
            ],
            data: []
          }
      },
      methods:{
        openContainerDetails(evt, row){
          console.log(row.id);
          this.chosen_container = row.info;
          this.show_DBInstanceInfo = !this.show_DBInstanceInfo
        },
        deleteDBInstance(){
            console.log('DELETINGGGGG',this.chosen_instance.id);
        },
        getDatabases(){
          RestAPI.get('databases/listDatabases').
          then(resp => this.databasesToTableFormat(resp.data)).
          catch(err => notifications.handleError(err));

        },
        databasesToTableFormat(response){
          console.log(response)
          response.forEach(e => {
            this.data.push({
              id: e.Id,
              name: e.Names[0],
              type: e.Image,
              version: e.Image,
              state: e.State,
              status: e.Status,
              info: e
            });
          });
        }
      },
      mounted() {
          this.getDatabases();
      }
    }
</script>

<style scoped>
  .new-instance-settings-grid {
    display: grid;
    gap: 3em;
    padding-right: 10em;
    padding-left: 10em;
    grid-template-columns: repeat(2, 1fr);
  }
</style>
