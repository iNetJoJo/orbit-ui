import Notify from "quasar/src/plugins/Notify";

export default {
  handleError(error){
  console.log(error);
  Notify.create({
    group: false,
    message: error,
    color: 'red',
    multiLine: true
  })
},
  handleSuccess(response, message){
    console.log(response);
    Notify.create({
      group: false,
      message: message,
      color: 'green',
      multiLine: true
    })
  },
  Tabs:{
    DATABASES: 1
  }

}
