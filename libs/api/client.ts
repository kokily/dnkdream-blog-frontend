import axios from 'axios';

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/api'
      : 'https://api.dnkdream.com/api',
  withCredentials: true,
});

export default client;
