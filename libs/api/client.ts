import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.dnkdream.com/api',
  withCredentials: true,
});

export default client;
