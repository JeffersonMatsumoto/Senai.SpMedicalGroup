import axios from "axios";

//tem q ser o IP pq é jvm no web ele pode ser localhost...
const api = axios.create({
  baseURL: "http://192.168.5.58:5000/api"
});

export default api;