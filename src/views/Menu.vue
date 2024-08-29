<template>
  <v-app>
    Menu View
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import getWeeksListUseCase from '../domain/usecases/get_weeks_list_usecase';

onMounted(async () => {
  const x = await getWeeksListUseCase.call();
  console.log(x[0]);
});
</script>
