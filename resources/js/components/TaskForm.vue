<template>
  <form @submit.prevent="submitForm" class="form">
    <div class="form-field">
      <input v-model="form.nome" required class="input-webflow" placeholder="Título" />
    </div>
    <div class="form-field">
      <input v-model="form.descricao" class="input-webflow" placeholder="Detalhes" />
    </div>
    <div class="form-field">
      <input v-model="form.data_limite" type="datetime-local" class="input-webflow" placeholder="Data" />
    </div>
    <div class="modal-actions">
      <button type="button" @click="$emit('cancel')" class="button outlined rounded">Fechar</button>
      <button type="submit" class="button rounded green">Salvar / Editar</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  task: Object,
});
const emit = defineEmits(['submit', 'cancel']);

const form = reactive({
  nome: '',
  descricao: '',
  data_limite: '',
});

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      form.nome = newTask.nome || '';
      form.descricao = newTask.descricao || '';
      form.data_limite = newTask.data_limite ? newTask.data_limite.slice(0, 16) : '';
    } else {
      form.nome = '';
      form.descricao = '';
      form.data_limite = '';
    }
  },
  { immediate: true }
);

function submitForm() {
  emit('submit', { ...form });
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.form-field {
  width: 100%;
}
.input-webflow {
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 14px 16px;
  font-size: 16px;
  background: #fafbfc;
  margin-bottom: 0;
  outline: none;
  transition: border 0.2s;
}
.input-webflow:focus {
  border: 1.5px solid #1fb76c;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
}
.button.rounded.green {
  background: #1fb76c;
  color: #fff;
  border-radius: 24px;
  border: none;
  padding: 10px 24px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.button.rounded.green:hover {
  background: #179e5a;
}
.button.outlined.rounded {
  background: #fff;
  color: #333;
  border: 1.5px solid #e5e7eb;
  border-radius: 24px;
  padding: 10px 24px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.button.outlined.rounded:hover {
  background: #f3f4f6;
}
</style>
