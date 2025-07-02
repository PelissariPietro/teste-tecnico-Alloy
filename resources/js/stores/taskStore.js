import { defineStore } from 'pinia';
import taskService from '../services/taskService';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
    selectedTask: null,
  }),
  actions: {
    async fetchTasks() {
      this.loading = true;
      try {
        this.tasks = await taskService.fetchTasks();
        this.error = null;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    async createTask(task) {
      this.loading = true;
      try {
        const newTask = await taskService.createTask(task);
        this.tasks.push(newTask);
        this.error = null;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    async updateTask(id, task) {
      this.loading = true;
      try {
        const updated = await taskService.updateTask(id, task);
        const idx = this.tasks.findIndex(t => t.id === id);
        if (idx !== -1) this.tasks[idx] = updated;
        this.error = null;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    async deleteTask(id) {
      this.loading = true;
      try {
        await taskService.deleteTask(id);
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.error = null;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    async toggleTask(id) {
      this.loading = true;
      try {
        const toggled = await taskService.toggleTask(id);
        const idx = this.tasks.findIndex(t => t.id === id);
        if (idx !== -1) this.tasks[idx] = toggled;
        this.error = null;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    selectTask(task) {
      this.selectedTask = task;
    },
    clearSelectedTask() {
      this.selectedTask = null;
    }
  }
});
