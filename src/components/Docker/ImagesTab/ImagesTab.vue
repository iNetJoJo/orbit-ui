<template>
  <div class="q-pa-md">
    <q-btn-group>
      <q-btn
        class="bg-green-5 text-white"
        label="Pull Image"
        icon-right="add"
        @click="pullImagesTable = !pullImagesTable"
      />
    </q-btn-group>
    <ImagesTable />
    <q-dialog v-model="pullImagesTable" full-width>
      <PullImageModal/>
    </q-dialog>
  </div>
</template>

<script>
import PullImageModal from "./PullImageModal";
import ImagesTable from "./ImagesTable";
export default {
  name: "ImagesTab",
  components: {
    ImagesTable,
    PullImageModal,
  },
  data() {
    return {
      pullImagesTable: false
    };
  }
};
</script>

<style scoped></style>
