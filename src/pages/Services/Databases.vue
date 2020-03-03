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
      <DBTable :data="data" :row-click="openContainerDetails"/>
<!--    Show dialog for adding new instance-->
    <q-dialog
      v-model="add_DBInstance"
      full-width
    >
     <DatabasePickerModal :close="closeAddInstanceModal" v-bind:existing-databases="data" :reload-table="getDatabases"/>
    </q-dialog>
<!--    Shows db instance info-->
    <q-dialog v-model="show_DBInstanceModal" full-width>
      <DockerContainerInspectModal :container="chosen_container" :reset-table="getDatabases" :exit-modal="show_DBInstanceModal != show_DBInstanceModal"/>
    </q-dialog>
  </q-page>
</template>

<script>
  import 'boot/axios';
  import DockerContainerInspectModal from "../../components/InspectModal/ContainersInspectModal";
  import DatabasePickerModal from "../../components/Databases/PickerModal/DatabasePickerModal";
  import RestAPI from "../../lib/backend-rest/RestAPI";
  import notifications from "../../lib/Notification/notifications";
  import DBTable from "../../components/Databases/DatabasesTable/DBTable";
  import {EventBus} from '../../lib/eventBus/eventBus';

    export default {
        name: "Databases",
      components: {DBTable, DatabasePickerModal, DockerContainerInspectModal},
      data(){
          return{
            start_when_created: false,
            show_logs_when_created: false,
            add_DBInstance: false,
            show_DBInstanceModal: false,
            chosen_container: null,
            data: []
          }
      },
      methods:{
          closeAddInstanceModal(){
            this.add_DBInstance = !this.add_DBInstance;
          },
        openContainerDetails(evt, row){
          console.log(row.id);
          this.chosen_container = row.info;
          this.show_DBInstanceModal = !this.show_DBInstanceModal
        },
        getDatabases(){
          RestAPI.get('databases/listDatabases').
          then(resp => this.databasesToTableFormat(resp.data)).
          catch(err => notifications.handleError(err));

        },
        databasesToTableFormat(response){
            this.data = [];
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
          EventBus.$on('db-event', (e) => {
            this.getDatabases();
          })
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
