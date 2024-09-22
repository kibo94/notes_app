
import axios from "axios"
const instance = axios.create({
  baseURL: 'https://notes-app-bjk8.vercel.app/api'
  // baseURL: "http://localhost:4000",

});
export default instance;  