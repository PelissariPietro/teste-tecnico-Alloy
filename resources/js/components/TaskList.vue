<template>
  <div class="block-tasks w-full" style="max-width:100vw; margin:0; border-radius:0; box-shadow:none;">
    <div class="tasks-header">
      <slot name="actions"></slot>
    </div>
    <div v-if="loading" class="text-gray-500 text-center py-8">Carregando...</div>
    <div v-else>
      <div v-if="tasks.length === 0" class="text-gray-400 text-center py-8">Nenhuma tarefa encontrada.</div>
      <div class="block-tasks">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @edit="onEdit"
          @toggle="onToggle"
          @delete="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns';
function formatDate(date) {
  if (!date) return '';
  try {
    return format(new Date(date), "EEEE, 'dia' dd/MM/yyyy", { locale: undefined });
  } catch {
    return date;
  }
}
import { useTaskStore } from '../stores/taskStore';
import TaskItem from './TaskItem.vue';
import { onMounted } from 'vue';
import { computed } from 'vue';

const emit = defineEmits(['edit', 'create']);
const store = useTaskStore();
const tasks = computed(() => store.tasks);
const loading = computed(() => store.loading);

onMounted(() => {
  store.fetchTasks();
});

function onEdit(task) {
  emit('edit', task);
}
function onToggle(task) {
  store.toggleTask(task.id);
}
function onDelete(task) {
  store.deleteTask(task.id);
}
</script>

<style scoped>
.block-tasks {
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  background: #fff;
  border-radius: 0;
  box-shadow: none;
  padding: 0 0 24px 0;
}
.tasks-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
}
.tasks-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
}
.tasks-list {
  list-style: none;
  margin: 0;
  padding: 16px 0 0 0;
}
.task-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
  border-radius: 6px;
  transition: background 0.2s;
}
.task-list-item:hover {
  background: #f5f5f5;
}
.task-main {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}
.task-checkbox {
  margin-top: 4px;
}
.task-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.task-title {
  font-size: 16px;
  font-weight: 500;
  color: #222;
}
.task-done {
  text-decoration: line-through;
  color: #aaa;
}
.task-desc {
  font-size: 13px;
  color: #666;
}
.task-date {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: background 0.2s;
  margin-left: 8px;
}
.delete-btn:hover {
  background: #f2f2f2;
}
</style>
