import {Cookies} from "quasar";
import axios from "axios";

const ServerAddress = 'http://localhost:4200/api';
export default axios.create({baseURL: ServerAddress, headers:{Authorization: 'Token ' + Cookies.get('jwt-token')}});
