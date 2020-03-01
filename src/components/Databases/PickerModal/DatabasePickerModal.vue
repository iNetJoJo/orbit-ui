<template>
  <q-card style="height: 50em; padding-bottom: 5px">
    <q-btn
      v-if="formActive"
      style="margin: 10px"
      size="15px"
      round
      color="green"
      icon="arrow_back"
      @click="logTest"
    />
    <div class="text-center">
    <template v-if="!formActive">
    <q-card-section>
      <div class="text-h2 text-bold">Add new database instance</div>
    </q-card-section>>
    <q-card-section style="margin-top: 7em" >
      <DBPickerButton :action="select_db" :hover-controller="update_text_info" name="PostgreSQL" avatar="https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg"/>
      <DBPickerButton :action="select_db" :hover-controller="update_text_info" name="MySQL" avatar="https://www.mysql.com/common/logos/logo-mysql-170x115.png"/>
      <DBPickerButton :action="select_db" :hover-controller="update_text_info" name="Apache Cassandra" avatar="https://upload.wikimedia.org/wikipedia/commons/5/5e/Cassandra_logo.svg"/>
    </q-card-section>
    <q-card-section>
      <div class="text-h4 text-bold">{{db_info_text}}</div>
    </q-card-section>
    </template>
    <DBConfigForm v-else :existing-databases="existingDatabases" :reload-table="reloadTable"/>
    </div>
  </q-card>
</template>

<script>
    import DBPickerButton from "./DBPickerButton";
    import DBConfigForm from "./DBConfigForm";
    export default {
        name: "DatabasePickerModal",
      props:{
        existingDatabases: Array,
        reloadTable: Function
      },
      components: {DBConfigForm, DBPickerButton},
      data(){
          return{
            db_info_text: "",
            formActive: false,
          }
        },
      methods:{
          update_text_info(text){
            console.log(text);
            this.db_info_text = text;
          },
          select_db(){
            this.formActive = true;
          },
          logTest(){
            console.log(this.$props)
          },
      }
    }
</script>

<style scoped>
  .db-button {
    margin: 5px;
  }
</style>
