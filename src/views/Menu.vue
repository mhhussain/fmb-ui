<template>
  <v-app>
    Menu View
    <v-card v-for="week in weeks">
      {{ week.weeklyMenuId ``}}
    </v-card>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import getWeeksListUseCase from '../domain/usecases/get_weeks_list_usecase';

const weeks = ref([]);

onMounted(async () => {
  const data = await getWeeksListUseCase.call();
  weeks.value = data;
});
</script>
