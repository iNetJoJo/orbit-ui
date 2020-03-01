<template>
  <q-btn
    @mouseover="hoverController(name)"
    @mouseleave="hoverController('')"
    size="8em"
    class="q-px-xl q-py-xs db-button"
    color="green"
    @click="action"
  >
    <q-avatar square size="2em">
      <img v-bind:src="avatar" alt="">
    </q-avatar>
  </q-btn>
</template>

<script>
    export default {
      props:{
        hoverController: Function,
        name: String,
        avatar: String,
        action: Function
      },
        name: "DBPickerButton"
    }
</script>

<style scoped>

</style>
