<template>
  <div class="orbit-front-page">
    <PageTitle text="Orbit Login"/>
    <div class="col items-end" style="background-color: rgba(37,122,0,0.76); padding: 9em; border-radius: 3em">
      <q-input v-model="email" bg-color="white"  rounded outlined label="Email" type="email"/>
      <br>
    <q-input v-model="password" bg-color="white" label="Password" rounded outlined type="password" />
      <br>
      <q-btn color="secondary" icon-right="done" label="Login" @click="login"/>
    </div>
  </div>
</template>

<script>
    import PageTitle from "../components/PageTitle";
    import 'boot/axios';
    import { Cookies } from 'quasar'

    export default {
        name: "Login",
      components: {PageTitle},
      data(){
          return{
            email: null,
            password: null,
          }
      },
      methods: {
        login() {
          console.log(this.email)
          console.log(this.password)
          let request = {
            user: {
              email: this.email,
              password: this.password
            }
          };

          this.$axios.post('http://localhost:4200/api/users/login', request).then(resp => this.saveJwtToCookie(resp)).catch(err => this.handlerError(err));
        },
        saveJwtToCookie(resp) {
          Cookies.set('jwt-token', resp.data.user.token, {secure: true})
          this.$router.push('dashboard')
        },
        handlerError(error){
          let msg = "unexpected error"
          if (error.response.status == 403){
            msg = "Invalid credentials"
          }

          console.log(error)
          this.$q.notify({
            message: msg,
            color: 'red',
            multiLine: true
          })
        }
      }
    }
</script>

<style scoped>
  .orbit-front-page {
    background: url("~src/assets/orbit-background.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top;
    background-size: 70%;
    padding: 12% 25% 16% 25%;
    height: max-content;
    /*opacity: 0.75;*/
  }
</style>
