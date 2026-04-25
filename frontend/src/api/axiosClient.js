import axios from "axios";

const API = axios.create({
  baseURL: "http://edu.biz499.com/api/",
});

export default API;
