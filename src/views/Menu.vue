<template>
  <v-app>
    Menu View
    <v-data-table
      :headers="headers"
      :items="datagriditems"
      :loading="loading"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item.week="{ item }">
        <span>Monday {{ item.mondayItemCount }}</span>
        <span>Tuesday {{ item.tuesdayItemCount }}</span>
        <span>Wednesday {{ item.wednesdayItemCount }}</span>
        <span>Thursday {{ item.thursdayItemCount }}</span>
        <span>Friday {{ item.fridayItemCount }}</span>
        <span>Saturday {{ item.saturdayItemCount }}</span>
        <span>Sunday {{ item.sundayItemCount }}</span>
      </template>
      <template v-slot:item.icons="{ item }">
        <v-icon @click="onClickViewWeek(item)">mdi-view-week</v-icon>
        <v-icon @click="onClickEmailSend(item)">{{ item.emailSent ? 'mdi-email-check-outline' : 'mdi-email-alert-outline' }}</v-icon>
        <v-icon @click="onClickFillReports(item)">mdi-file-chart-outline</v-icon>
        <v-icon @click="onClickEdit(item)">mdi-pencil</v-icon>
      </template>
    </v-data-table>
  </v-app>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import getWeeksListUseCase from '../domain/usecases/get_weeks_list_usecase';

const loading = ref(false);

const headers = [
  { title: 'Week Start', 'value': 'weekStart' },
  { title: 'Cutoff', 'value': 'cutoffDateTime' },
  { title: 'Week', 'value': 'week' },
  { title: '', 'value': 'icons' },
];

const datagriditems = computed(() => weeks.value);

const onClickViewWeek = (week) => {
  alert('view week summary');
};

const onClickEmailSend = (week) => {
  alert('email send');
};

const onClickFillReports = (week) => {
  alert('fill reports');
};

const onClickEdit = (week) => {
  alert('edit');
};

// Data
const weeks = ref([]);

onMounted(async () => {
  loading.value = true;
  
  const data = await getWeeksListUseCase.call();
  weeks.value = data;
  
  loading.value = false;
});
</script>
