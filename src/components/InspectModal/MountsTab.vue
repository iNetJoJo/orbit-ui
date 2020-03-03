<template>
  <div>
    <div class="text-h4 q-mb-md">Movies</div>
    <div class="q-pa-md">
      <q-table
        :columns="columnsMounts"
        :data="mounts"
        bordered
        card-class="bg-green-5 text-white"
        flat
        row-key="name"
        style="color: white"
        table-class="text-white-8"
        table-header-class="text-white"
        title="Databases"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: "MountsTab",
    props: {
      mounts: Array
    },
    data() {
      return {
        columnsMounts: [
          {name: 'Type', label: 'Type', field: 'Type', sortable: true},
          {
            name: 'Destination',
            label: 'Destination',
            field: 'Destination',
            sortable: true,
            sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
          },
          {
            name: 'Mode',
            label: 'Mode',
            field: 'Mode',
            sortable: true,
            sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
          },
          {
            name: 'RW',
            label: 'RW',
            field: 'RW',
            sortable: true,
            sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
          },
          {
            name: 'Propagation',
            label: 'Propagation',
            field: 'Propagation',
            sortable: true,
            sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
          }
        ],
      }
    }
  }
</script>

<style scoped>

</style>
