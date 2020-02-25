<template>
  <q-page>
    <div class="q-pa-md">
      <q-btn-group>
        <q-btn class="bg-green-5 text-white" label="Add instance" icon-right="add" @click="add_DBInstance = !add_DBInstance"/>
<!--        <q-btn class="bg-green-5 text-white"  label="Second" />-->
<!--        <q-btn class="bg-green-5 text-white"  label="Third" />-->
<!--        <q-btn class="bg-green-5 text-white"  label="Fourth" />-->
      </q-btn-group>
    </div>
  <div class="q-pa-md">
    <q-table
      style="color: white"
      card-class="bg-green-5 text-white"
      table-class="text-white-8"
      table-header-class="text-white"
      flat
      bordered
      title="Databases"
      :data="data"
      :columns="columns"
      row-key="name"
      @row-click="openInstanceDetails"
    />
  </div>
<!--    Show dialog for adding new instance-->
    <q-dialog
      v-model="add_DBInstance"
      full-width
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">Add new instance</div>
        </q-card-section>
          <div class="new-instance-settings-grid">
            <div>
              <q-input standout="bg-green text-white" v-model="instance.name" label="Name"  />
              <q-input standout="bg-green text-white" v-model="instance.port" label="Port"  />
              <q-input standout="bg-green text-white" v-model="instance.database" label="Database"  />
              <q-input standout="bg-green text-white" v-model="instance.user" label="User"  />
              <q-input standout="bg-green text-white" v-model="instance.password" label="Password"/>
            </div>
            <div>
              <div class="q-gutter-sm column">
                <q-toggle
                  v-model="start_when_created"
                  color="green"
                  label="Start when created"
                />
                <q-toggle
                  v-model="show_logs_when_created"
                  color="green"
                  label="Show logs when created"
                />
              </div>
            </div>
          </div>


        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat class="bg-green-6 text-white" label="Add" v-close-popup icon="add" @click="addNewDBInstance"/>
        </q-card-actions>
      </q-card>
    </q-dialog>


<!--    Shows db instance info-->
    <q-dialog
      v-model="show_DBInstanceInfo"
      full-width
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">Add new instance</div>
        </q-card-section>
        <q-field standout class="bg-green-5" hint="Instance name" readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline">{{chosen_instance.name}}</div>
          </template>
        </q-field>
        <q-field standout class="bg-green-5" hint="Type" readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline">{{chosen_instance.type}}</div>
          </template>
        </q-field>
        <q-field standout class="bg-green-5" hint="Port" readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline">{{chosen_instance.info.port}}</div>
          </template>
        </q-field>
        <q-field standout class="bg-green-5" hint="Database" readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline">{{chosen_instance.info.database}}</div>
          </template>
        </q-field>
        <q-field standout class="bg-green-5" hint="User" readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline">{{chosen_instance.info.user}}</div>
          </template>
        </q-field>
        <q-field standout class="bg-green-5" hint="Password" readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline">{{chosen_instance.info.password}}</div>
          </template>
        </q-field>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat class="bg-red-5 text-white" label="Delete" v-close-popup icon="clear" @click="deleteDBInstance"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
    export default {
        name: "Databases",
      data(){
          return{
            start_when_created: false,
            show_logs_when_created: false,
            add_DBInstance: false,
            show_DBInstanceInfo: false,
            chosen_instance: null,

            instance:{
              name: '',
              port: '',
              database: '',
              user: '',
              password: '',
            },
            columns: [
              {
                name: 'name',
                required: true,
                label: 'Instance name',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: true,
              },
              { name: 'type', align: 'center', label: 'Type', field: 'type', sortable: true },
              { name: 'type', align: 'center', label: 'Version', field: 'version', sortable: true },
              { name: 'size', label: 'Size (gb)', field: 'size', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
              { name: 'status', label: 'Status', field: 'status', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
            ],
            data: []
          }
      },
      methods:{
          addNewDBInstance(){
            let name = this.instance.name;
            let type = 'Postgres';
            let version = 13.1;
            let size = 2.32;
            let status = 'off';

            let data = {
              id: 69,
              name,
              type,
              version,
              size,
              status,
              info: this.instance
            };

            this.data.push(data);
          },
        openInstanceDetails(evt, row){
          console.log(row.id);
          this.chosen_instance = row;
          this.show_DBInstanceInfo = !this.show_DBInstanceInfo
        },
        deleteDBInstance(){
            console.log('DELETINGGGGG',this.chosen_instance.id);
        }
      }
    }
</script>

<style scoped>
  .new-instance-settings-grid {
    display: grid;
    gap: 3em;
    padding-right: 10em;
    padding-left: 10em;
    grid-template-columns: repeat(2, 1fr);
  }
</style>
