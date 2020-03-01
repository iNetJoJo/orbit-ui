<template>
  <div class="q-pa-md">

    <q-avatar color="red" size="25px" text-color="white">{{notifications.length}}</q-avatar>
    <q-btn-dropdown
      color="white"
      push
      flat
      no-caps
      icon="mail"
      label="Notifications"
      @click="testLog"
    >
      <q-list>
        <q-item clickable v-close-popup v-for="(notification, i) in notifications" v-bind:key="i+notification">
          <q-item-section>
            <q-item-label>{{notification.Notification}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <NotificationIcons :status="notification.Status" :tab="notification.Tab"/>
          </q-item-section>
        </q-item>

        <q-item v-if="notifications.length === 0" clickable v-close-popup>
          <q-item-section>
            <q-item-label>No new notifications!</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="info" color="amber" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
  import {Cookies} from 'quasar'
  import RestAPI from "../../lib/backend-rest/RestAPI";
  import NotificationIcons from "./NotificationIcons";
  import notifications from "../../lib/Notification/notifications";
  import {EventBus} from "../../lib/eventBus/eventBus";

  export default {
        name: "Notifications",
      components: {NotificationIcons},
      data(){
          return{
            notifications: [],
            wsConn: WebSocket
          }

      },
      methods:{
        testLog(){
          console.log(this.notifications);
        },
        subscribeWS(){
          var loc = window.location;
          console.log(loc);
          var uri = 'ws:';

          if (loc.protocol === 'https:') {
            uri = 'wss:';
          }
          uri += '//' + 'localhost:4200';
          uri += '/api/ws/notification';

          let ws = new WebSocket(uri);

          ws.onopen = function() {
            console.log('Connected');
            ws.send(JSON.stringify({token: Cookies.get('jwt-token')}))
          };
          ws.onclose = function () {
            console.log('closing')
          };

          ws.onmessage = (evt) => {
            console.log(evt);
            this.notifyEvent(evt)
          };
          this.wsConn = ws;
        },
        notifyEvent(evt) {
          let notification = JSON.parse(evt.data);
          this.notifications.push(notification);
          console.log('NOTFIKACIJA',notification)

          if (notification.Status === 1) {
            notifications.handlerError(notification.Notification)
          } else {
            console.log(notification.Notification)
            notifications.handleSuccess(evt, notification.Notification)
          }

          switch (notification.Tab) {
                  case notifications.Tabs.DATABASES: EventBus.$emit('db-event', notification);
                  default: break;
          }


        },
        getAllNotifications() {
          RestAPI.get('notifications/get-all-notifications').then(resp => this.notifications.push(...resp.data)).catch(err => notifications.handlerError(err))
        }
      },
      mounted() {
          this.subscribeWS();
          this.getAllNotifications();
      },
      beforeDestroy() {
          this.wsConn.close();
      }
    }
</script>

<style scoped>

</style>
