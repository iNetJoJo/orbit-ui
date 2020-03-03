<template>
  <div class="q-pa-md">
    <q-btn-group>
      <q-btn
        class="bg-green-5 text-white"
        label="Pull Image"
        icon-right="add"
        @click="createNetworkModal = !createNetworkModal"
      />
    </q-btn-group>
    <ImagesTable />
    <q-dialog v-model="createNetworkModal" full-width>
      <PullImageModal/>
    </q-dialog>
  </div>
</template>

<script>
  export default {
    name: "ImagesTab",
    components: {
    },
    data() {
      return {
        createNetworkModal: false
      };
    }
  };
</script>

<style scoped></style>
