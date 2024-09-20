
import axios from "axios"
const instance = axios.create({
  baseURL: 'https://notes-app-api-amber.vercel.app'

});
export default instance;  