<template>
  <div class="q-pa-md">
    <q-btn-group>
      <q-btn class="bg-green-5 text-white" label="Create Container" icon-right="add" @click="createContainerModal = !createContainerModal"/>
    </q-btn-group>
    <ContainersTable :data="containers" :row-click="openContainerDetails"/>
    <q-dialog v-model="createContainerModal" full-width>
      <CreateContainerModal/>
    </q-dialog>
    <q-dialog v-model="inspectContainerModal" full-width>
      <DockerContainerInspectModal :container="chosen_container"/>
    </q-dialog>
  </div>
</template>

<script>
    import ContainersTable from "./ContainersTable";
    import CreateContainerModal from "./CreateContainerModal";
    import DockerContainerInspectModal from "../../InspectModal/ContainersInspectModal";
    import RestAPI from "../../../lib/backend-rest/RestAPI";
    import notifications from "../../../lib/Notification/notifications";
    export default {
        name: "ContainersTab",
      components: {DockerContainerInspectModal, CreateContainerModal, ContainersTable},
      data(){
          return{
            createContainerModal: false,
            inspectContainerModal: false,
            containers: [],
            chosen_container: null
          }
      },
      methods:{
        dockerContainerList(){
          RestAPI.get('/docker/list-containers').
          then(resp => this.containersToTableFormat(resp.data)).
          catch(err => notifications.handleError(err))
        },
        containersToTableFormat(response){
          this.containers = [];
          response.forEach(e => {
            this.containers.push({
              id: e.Id,
              name: e.Names[0],
              type: e.Image,
              version: e.Image,
              state: e.State,
              status: e.Status,
              info: e
            });
          });
        },
        openContainerDetails(evt, row){
          console.log(row.id);
          this.chosen_container = row.info;
          this.inspectContainerModal = !this.inspectContainerModal
        }
      },
      computed:{

      },
      mounted() {
          this.dockerContainerList();
      }
    }
</script>

<style scoped>

</style>
