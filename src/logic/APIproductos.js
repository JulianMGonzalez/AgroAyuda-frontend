import axios from "axios";
const API = "http://localhost:3000/api/articulo/";

export default {
  get() {
    return axios.get(API + "list");
  },
  post(todo, header) {
    return axios.post(API + "add", todo, header);
  }

};