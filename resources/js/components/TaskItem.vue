<template>
  <div class="task" @click="emitEdit">
    <label class="w-checkbox checkbox-field">
      <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox margin-right-10"></div>
      <input type="checkbox" :checked="task.finalizado" @change.stop="$emit('toggle', task)" class="accent-green-600 w-5 h-5 cursor-pointer mr-4" /><span :class="['w-auto truncate', {'line-through text-gray-400': task.finalizado, 'font-semibold text-base': true}]"> {{ task.nome }} </span>
    </label>
    <button @click.stop="$emit('delete', task)" style="margin-left:8px; position:absolute; right:16px; top:50%; transform:translateY(-50%); z-index:2;" class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-red-50 transition opacity-80 hover:opacity-100 cursor-pointer" aria-label="Excluir tarefa">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M9 3V4H4V6H5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z" fill="#e53e3e"/>
      </svg>
    </button>
    <div class="date-button margin-left-40">
      <div><span v-if="task.data_limite" class="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1 w-fit">{{ humanDate(task.data_limite) }}</span></div>
    </div>
    <div class="task-details">
      <span v-if="task.descricao" class="text-xs text-gray-500">{{ task.descricao }}</span>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { defineEmits } from 'vue';
const emit = defineEmits(['edit', 'toggle', 'delete', 'update']);
const props = defineProps({
  task: Object
});

function editarTask(novosDados) {
  emit('update', { ...props.task, ...novosDados });
}

function humanDate(date) {
  if (!date) return '';
  const d = new Date(date);
  const hoje = new Date();
  hoje.setHours(0,0,0,0);
  d.setHours(0,0,0,0);
  const diff = Math.floor((d - hoje) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Amanhã';
  if (diff === -1) return 'Ontem';
  if (diff > 1 && diff < 7) return `Em ${diff} dias`;
  if (diff < 0 && diff > -7) return `${Math.abs(diff)} dias atrás`;
  return format(d, "EEEE, 'dia' dd/MM/yyyy", { locale: ptBR });
}

function emitEdit() {
  emit('edit', props.task);
}
</script>

<style scoped>
li {
  border-radius: 12px;
  transition: background 0.2s;
  width: 100%;
  min-width: 0;
  list-style: none;
  position: relative;
}
li:hover {
  background: #f8fafc;
}
.task {
  position: relative;
}
</style>
