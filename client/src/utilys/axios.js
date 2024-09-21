
import axios from "axios"
const instance = axios.create({
  baseURL: 'https://notes-app-api-amber.vercel.app'
  // baseURL: "http://localhost:4000",

});
export default instance;  