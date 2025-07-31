// axios.ts or auth.ts
import axios from 'axios';

axios.defaults.withCredentials = true; // Send cookies with requests
axios.defaults.baseURL = 'http://127.0.0.1:8000'; // Change to your Laravel API

export default axios;
