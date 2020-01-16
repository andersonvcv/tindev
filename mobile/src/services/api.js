import axios from 'axios';

const api = axios.create({
  baseURL:'http://192.168.15.8:3333', // node backend port
});

export default api;