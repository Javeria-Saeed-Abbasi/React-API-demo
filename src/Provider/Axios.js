import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://buybestthemes.com/findmyfitness_api/api/',
});

export default instance;