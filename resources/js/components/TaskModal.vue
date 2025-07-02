<template>
  <div v-if="show" class="modal-bg">
    <div class="modal-webflow">
      <div class="modal-header">
        <h3 class="modal-title">{{ isEdit ? 'Editar tarefa' : 'Nova tarefa' }}</h3>
        <button class="modal-close" @click="onCancel" aria-label="Fechar">×</button>
      </div>
      <TaskForm :task="task" @submit="onSubmit" @cancel="onCancel" />
    </div>
  </div>
</template>

<script setup>
import TaskForm from './TaskForm.vue';
import { computed } from 'vue';

const props = defineProps({
  show: Boolean,
  task: Object,
});
const emit = defineEmits(['submit', 'cancel']);

const isEdit = computed(() => !!props.task && !!props.task.id);

function onSubmit(task) {
  emit('submit', task);
}
function onCancel() {
  emit('cancel');
}
</script>

<style scoped>
.modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.modal-webflow {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
  max-width: 400px;
  width: 100%;
  padding: 32px 24px 24px 24px;
  position: relative;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.modal-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}
.modal-close {
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  color: #333;
  margin-left: 8px;
}
</style>
