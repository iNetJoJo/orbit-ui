<template>
  <div class="q-pa-lg" style="padding-left: 50em; padding-right: 50em">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="instance.name"
        label="Name"
        hint="Instance name"
        lazy-rules
        :rules="[
          val => val && val.length > 0 || 'Please type something',
          val => DBNameExists(val) || 'Instance with selected name already exists'
        ]"
      />

      <q-input
        filled
        v-model="instance.database"
        label="Database"
        hint="Database name"
        lazy-rules
        :rules="[
          val => val && val.length > 0 || 'Please type something',
          val => DBNameExists(val) || 'Instance with selected name already exists'
        ]"
      />

      <q-select v-model="instance.image" :options="images" label="Image" />

      <q-input
        filled
        type="number"
        v-model="instance.port"
        label="Port"
        hint="Database port"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type instance port',
         // val => val < 1024 && val > 49151 || 'Allowed range (1024-49151)',
          val => DBPortInUse(val) || 'Instance with selected port already exists'
        ]"
      />

      <q-input
        filled
        v-model="instance.user"
        label="User"
        hint="Database user"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="instance.password"
        label="Password"
        hint="User password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

<!--      <q-toggle v-model="instance.auto_start" label="Start database after it is created" />-->

      <div>
        <q-btn label="Submit" type="submit" color="green"/>
        <q-btn label="Reset" type="reset" color="red" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
    import RestAPI from "../../../lib/backend-rest/RestAPI";
    import notifications from "../../../lib/Notification/notifications";

    export default {
        name: "DBConfigForm",
      props:{
          existingDatabases: Array,
          reloadTable: Function
      },
      data(){
          return{
            images:['postgres:11', 'postgres:12'],
            instance: {
                name: "",
              image: "",
                user: "",
                password: "",
              port: 0,
              database: "",
                // auto_start: false
              }
            }
          },
      methods:{
          onSubmit(){
            RestAPI.post('/databases/add-postgres-instance', this.instance).
            then(resp => {
              notifications.handleSuccess(resp, 'successfully created new database');
              this.reloadTable();
            }).
              catch(err => notifications.handleError(err))
          },
        onReset(){
            console.log('reset')
        },
        DBNameExists(val){
            val = val.toLowerCase();
          console.log(val);
            return !this.existingDatabases.some(el => el.name.substring(1, el.name.indexOf('_')) === val)
        },
        DBPortInUse(val){
          for (let i = 0; i < this.existingDatabases.length; i++){
              if (this.existingDatabases[i].info.Ports.some(port => port.PublicPort == val)){
                return false
              }
          }
          return true
        }
      }
    }
</script>

<style scoped>

</style>
