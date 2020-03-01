import Notify from "quasar/src/plugins/Notify";

export default {
  handleError(error){
  console.log(error);
  Notify.create({
    message: error.message,
    color: 'red',
    multiLine: true
  })
},
  handleSuccess(response, message){
    console.log(response);
    Notify.create({
      message: message,
      color: 'green',
      multiLine: true
    })
  },
  Tabs:{
    DATABASES: 1
  }

}
