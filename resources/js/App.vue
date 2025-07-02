
<script setup>
import Appbar from '@/components/Appbar.vue';
import Footer from '@/components/Footer.vue';
import TasksContainer from '@/components/TasksContainer.vue';
import { ref } from 'vue';

const tasksContainerRef = ref();
function openCreateModal() {
  if (tasksContainerRef.value && tasksContainerRef.value.openCreateModal) {
    tasksContainerRef.value.openCreateModal();
  }
}
</script>

<template>
  <div class="content-tasks">
    <Appbar @create="openCreateModal" />
    <TasksContainer ref="tasksContainerRef" />
    <Footer />
  </div>
</template>
