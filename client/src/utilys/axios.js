
import axios from "axios"
const instance = axios.create({
    baseURL: 'https://my-notes-app-api.herokuapp.com'

  });
export default instance;  