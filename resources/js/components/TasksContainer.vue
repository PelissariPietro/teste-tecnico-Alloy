<script setup>
import TaskList from './TaskList.vue';
import TaskModal from './TaskModal.vue';
import { useTaskStore } from '../stores/taskStore';
import { ref, defineExpose } from 'vue';

const store = useTaskStore();
const showModal = ref(false);
const editingTask = ref(null);

function openCreateModal() {
  editingTask.value = null;
  showModal.value = true;
}
function openEditModal(task) {
  editingTask.value = { ...task };
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
  editingTask.value = null;
}
async function handleSubmit(task) {
  if (editingTask.value && editingTask.value.id) {
    await store.updateTask(editingTask.value.id, task);
  } else {
    await store.createTask(task);
  }
  closeModal();
}

defineExpose({ openCreateModal });
</script>

<template>
  <div class="tasks-container min-h-screen flex flex-col w-full">
    <div class="form-fields no-space-top w-form">
      <TaskList @edit="openEditModal" />
    </div>
    <TaskModal
      :show="showModal"
      :task="editingTask"
      @submit="handleSubmit"
      @cancel="closeModal"
    />
  </div>
</template>

<style scoped>
.tasks-container {
  width: 100vw;
  min-width: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
