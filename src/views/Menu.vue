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
        <WeekSummaryTableRow :week="item" />
      </template>
      <template v-slot:item.icons="{ item }">
        <v-btn>
          <v-icon>mdi-view-week</v-icon>
          <v-overlay
            activator="parent"
            class="align-center justify-center"
          >
            <WeekSummary :week="item" />
          </v-overlay>
        </v-btn>
        <v-btn
          @click="onClickEmailSend(item)"
          :color="item.emailSent ? 'green' : 'red'"
          :icon="item.emailSent ? 'mdi-email-check-outline' : 'mdi-email-alert-outline'"
        ></v-btn>
        <v-btn icon="mdi-file-chart-outline" @click="onClickFillReports(item)"></v-btn>
        <v-btn icon="mdi-pencil" @click="onClickEdit(item)"></v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import getWeeksListUseCase from '../domain/usecases/get_weeks_list_usecase';
import WeekSummaryTableRow from '@/components/organisms/WeekSummaryTableRow.vue';
import WeekSummary from '@/components/organisms/WeekSummary.vue';

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
