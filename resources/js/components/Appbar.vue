
<script setup>
const emit = defineEmits(['create']);
function onCreate() {
  emit('create');
}
</script>

<template>
  <div class="header">
      <h2>Tarefas</h2>
      <div data-w-id="55f4e760-52f8-9757-6a11-69e87d0307c9" class="button rounded" @click="onCreate">
        <div class="icon w-embed"><svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg></div>
      </div>
    </div>
</template>
