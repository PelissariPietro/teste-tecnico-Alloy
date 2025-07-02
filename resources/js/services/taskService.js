import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default {
  async fetchTasks() {
    const { data } = await api.get('/tasks');
    console.log('Fetched tasks:', data);
    return data;
  },
  async getTask(id) {
    const { data } = await api.get(`/tasks/${id}`);
    return data;
  },
  async createTask(task) {
    const { data } = await api.post('/tasks', task);
    return data;
  },
  async updateTask(id, task) {
    const { data } = await api.put(`/tasks/${id}`, task);
    return data;
  },
  async deleteTask(id) {
    const { data } = await api.delete(`/tasks/${id}`);
    return data;
  },
  async toggleTask(id) {
    const { data } = await api.patch(`/tasks/${id}/toggle`);
    return data;
  },
};
