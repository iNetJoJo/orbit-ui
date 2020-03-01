<template>
  <div>
    <div class="text-h4 q-mb-md">Controls</div>
    <div class="q-pa-md">
      <q-btn-group spread>
        <q-btn
          :disable="buttons.restart.disabled"
          @click="restartContainer"
          color="amber"
          icon="cached"
          label="Restart"
        />
        <q-btn
          :disable="buttons.start.disabled"
          @click="startContainer"
          color="green"
          icon="power_settings_new"
          label="Start"
        />
        <q-btn
          :disable="buttons.stop.disabled"
          @click="stopContainer"
          color="deep-purple-14"
          icon="power_settings_new"
          label="Stop"
        />
        <q-btn
          :disable="buttons.freeze.disabled"
          color="indigo-10"
          icon="pause_presentation"
          label="Freeze"
        />
        <q-btn
          :disable="buttons.delete.disabled"
          @click="deleteContainerWarning"
          color="red-14"
          icon="remove_circle"
          label="Delete"
        />
      </q-btn-group>
    </div>
    <q-dialog v-model="deleteWarningModal" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-red-9 text-white">
        <q-bar>
          <q-icon name="warning" />

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          You are about delete a database? Are you sure you want to proceed?
        </q-card-section>
        <q-card-section class="q-pt-none text-right">
          <q-btn
            :disable="buttons.delete.disabled"
            @click="deleteContainer"
            color="red-5"
            icon="remove_circle"
            label="Yes!"
            v-close-popup
          />
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import RestAPI from "../../../lib/backend-rest/RestAPI";
import notifications from "../../../lib/Notification/notifications";

export default {
  name: "ControlsTab",
  props: {
    container: {
      Id: String
    },
    resetTable: Function,
    exitModal: Function
  },
  data() {
    return {
      buttons: {
        restart: {
          disabled: false
        },
        start: {
          disabled: false
        },
        stop: {
          disabled: false
        },
        freeze: {
          disabled: false
        },
        delete: {
          disabled: false
        }
      },
      deleteWarningModal: false
    };
  },
  methods: {
    stopContainer() {
      this.sendGenericDockerCall(
        "/docker/stop-container",
        "successfully stopped docker container"
      );
    },
    startContainer() {
      this.sendGenericDockerCall(
        "/docker/start-container",
        "successfully started docker container"
      );
    },
    restartContainer() {
      this.sendGenericDockerCall(
        "/docker/restart-container",
        "successfully restarted docker container"
      );
    },
    deleteContainerWarning(){
        this.deleteWarningModal = true;
    },
    deleteContainer(){
      this.sendGenericDockerCall(
        "/docker/delete-container",
        "successfully deleted docker container"
      );
      this.resetTable();
      this.exitModal();
    },
    async sendGenericDockerCall(api, successMessage) {
      this.buttonsStatusAll(true);
      let request = {
        container_id: this.container.Id
      };
      console.log(request);

      RestAPI.post(api, request)
        .then(resp => {
          this.buttonsStatusAll(false);
          notifications.handleSuccess(resp, successMessage);
          this.resetTable();
        })
        .catch(err => {
          this.buttonsStatusAll(false);
          notifications.handleError(err.response.data.errors.body);
        });
    },
    buttonsStatusAll(status) {
      this.buttons.restart.disabled = status;
      this.buttons.start.disabled = status;
      this.buttons.stop.disabled = status;
      this.buttons.freeze.disabled = status;
      this.buttons.delete.disabled = status;
    }
  }
};
</script>

<style scoped></style>
