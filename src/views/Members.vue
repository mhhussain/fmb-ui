<template>
  <v-app>
    Members
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    />
    <v-data-table
      :headers="headers"
      :items="data"
      class="elevation-1"
      :hide-default-footer="true"
      :loading="loading"
      :search="search"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item.Edit="{ item }">
        <v-icon
          class="me-2"
          size="small"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '@/store/app';

const loading = ref(false);
const search = ref('');

const store = useAppStore();

const headers = ref([
  { title: 'Its ID', value: 'ItsID' },
  { title: 'HOF', value: 'HOF' },
  { title: 'Name', value: 'Name' },
  { title: 'Phone', value: 'Phone' },
  { title: 'Email', value: 'Email' },
  { title: '', value: 'Edit' },
]);

const data = computed(() => {
  return items.value
    .map(i => {
      return {
        ItsID: i.ItsID,
        HOF: i.RelationshipToHeadOfHousehold_RelationshipTypeID === 1 ? 'HOF' : '',
        Name: `${i.Title ? i.Title + ' ' : ''}${i.FirstName} ${i.MiddleName ? i.MiddleName + ' ' : ''}${i.LastName}`,
        Phone: i.CellPhone,
        Email: i.Email,
      };
    });
});

const editItem = (item) => {
  alert('TODO: route to edit mumineen screen');
};

// Data
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

<style scoped>
.v-text-field {
  max-height: 75px;
  max-width: 500px;
  overflow: hidden;
}
</style>