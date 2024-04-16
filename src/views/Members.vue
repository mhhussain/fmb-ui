<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      :hide-default-footer="true"
    />
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '@/store/app';

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
    await store.getMumineenList();
  }
  items.value = store.mumineen;
});
</script>
