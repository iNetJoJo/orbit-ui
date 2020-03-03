<template>
  <div class="q-pa-md">
    <q-table
      style="color: white"
      card-class="bg-green-5 text-white"
      table-class="text-white-8"
      table-header-class="text-white"
      flat
      bordered
      title="Docker Images"
      :data="data"
      :columns="columns"
      row-key="name"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
  export default {
    name: "ImagesTable",
    props:{
      data: Array,
      rowClick: Function
    },
    data(){
      return{
        columns: [
          {
            name: 'name',
            required: true,
            label: 'Image name',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: true,
          },
          { name: 'type', align: 'center', label: 'Type', field: 'type', sortable: true },
          { name: 'version', align: 'center', label: 'Version', field: 'version', sortable: true },
          { name: 'size', label: 'Size (gb)', field: 'state', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
          { name: 'status', label: 'Status', field: 'status', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
        ],
      }
    }
  }
</script>

<style scoped>

</style>
