
<!--This component outputs notification based on Tab and status-->
<template>
  <q-icon v-if="Tab === 1" name="storage" :color="Status === 1 ? 'red' : 'yellow'" />
</template>

<script>
  import notifications from "../../lib/Notification/notifications";
    export default {
        name: "NotificationIcons",
        props:{
          Tab: Number,
          Status: Number
        },
      mounted() {
          console.log(this.Tab, this.Status)
      }
    }
</script>

<style scoped>

</style>
