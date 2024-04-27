<template>
  <v-app>
    Members
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      :hide-default-footer="true"
      :loading="loading"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '@/store/app';

const loading = ref(false);

const store = useAppStore();

const headers = ref([
  { title: 'ItsID', value: 'ItsID' },
  { title: 'First Name', value: 'FirstName' },
  { title: 'Middle Name', value: 'MiddleName' },
  { title: 'Last Name', value: 'LastName' },
  { title: 'Cell Phone', value: 'CellPhone' },
  { title: 'Email', value: 'Email' },
]);

const items = ref([]);

onMounted(async () => {
  if (store.mumineen === null || store.mumineen.length === 0) {
    loading.value = true;
    await store.getMumineenList();
    loading.value = false;
  }
  items.value = store.mumineen;
});
</script>
