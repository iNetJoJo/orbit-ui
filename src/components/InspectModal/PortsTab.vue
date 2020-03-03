<template>
  <div>
    <div class="text-h4 q-mb-md">Ports</div>
    <div class="q-pa-md">
      <q-table
        :columns="columnsPorts"
        :data="ports"
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
    name: "PortsTab",
    props: {
      ports: Array
    },
    data() {
      return {
        columnsPorts: [
          {name: 'Ip', label: 'IP', field: 'IP', sortable: true},
          {name: 'PrivatePort', label: 'Private Port', field: 'PrivatePort', sortable: true},
          {
            name: 'PublicPort',
            label: 'Public Port',
            field: 'PublicPort',
            sortable: true,
            sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
          },
          {
            name: 'Type',
            label: 'Type',
            field: 'Type',
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
