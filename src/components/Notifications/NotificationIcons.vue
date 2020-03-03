
<!--This component outputs notification based on Tab and status-->
<template>
  <q-icon v-if="tab === 1" name="storage" :color="status === 1 ? 'red' : 'yellow'" />
</template>

<script>
  import notifications from "../../lib/Notification/notifications";
    export default {
        name: "NotificationIcons",
        props:{
          tab: Number,
          status: Number
        },
      mounted() {
          console.log(this.Tab, this.Status)
      }
    }
</script>

<style scoped>

</style>
