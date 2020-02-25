// import something here
import Vue from 'vue'
import axios from 'axios'
// "async" is optional
Vue.prototype.$axios = axios;



export default async ({ /* app, router, Vue, ... */ }) => {
// we add it to Vue prototype
// so we can reference it in Vue files
// without the need to import axios

}
