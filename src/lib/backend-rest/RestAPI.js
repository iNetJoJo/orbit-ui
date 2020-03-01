import Repository from "src/lib/backend-rest/Repository";


export default {
 async get(api, object){
   return Repository.get(api, object);
 },
  async post(api, object){
    return Repository.post(api, object);
 },
  async put(api, object){
   return Repository.put(api, object);
  }
}
