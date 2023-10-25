import axios from 'axios';

const api = axios.create({
  baseURL: 'https://technical-task-api.icapgroupgmbh.com/api/',
});

export default api;
