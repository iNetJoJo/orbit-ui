<template>
  <div>
    <div class="text-h4 q-mb-md">Networks</div>
    <div class="q-pa-md">
      <q-table
        :columns="columnsNetwork"
        :data="networks"
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
    name: "NetworksTab",
    props: {
      networks: Array,
    },
    data() {
      return {
        columnsNetwork: [
          {
            name: 'name',
            required: true,
            label: 'Instance name',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: true,
          },
          {name: 'Gateway', label: 'Gateway', field: 'Gateway', sortable: true},
          {name: 'IPAddress', label: 'IP Address', field: 'IPAddress', sortable: true},
          {
            name: 'IPPrefixLen',
            label: 'IP Prefix Length',
            field: 'IPPrefixLen',
            sortable: true,
            sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
          },
          {
            name: 'IPv6Gateway',
            label: 'IPv6 Gateway',
            field: 'IPv6Gateway',
            sortable: true,
            sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
          },
          {
            name: 'IPv6PrefixLen',
            label: 'IPv6 Prefix Length',
            field: 'IPv6PrefixLen',
            sortable: true,
            sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
          },
          {
            name: 'MacAddress',
            label: 'Mac Address',
            field: 'MacAddress',
            sortable: true,
            sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
          },
        ],
      }
    }
  }
</script>

<style scoped>

</style>
