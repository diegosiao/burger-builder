import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://movi-motors-app-default-rtdb.firebaseio.com'
});

export default instance;