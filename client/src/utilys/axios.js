
import axios from "axios"
const instance = axios.create({
  baseURL: 'https://notes-app-one-brown.vercel.app'

});
export default instance;  