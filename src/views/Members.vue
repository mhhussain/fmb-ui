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
      <template v-slot:item.Size="{ item }">
        {{ item.Members.length }}
      </template>
      <template v-slot:item.Members="{ item }">
        <p v-for="m in item.Members">
          {{ `${m.Title ? m.Title + ' ' : ''}${m.FirstName} ${m.MiddleName ? m.MiddleName + ' ' : ''}${m.LastName}` }}
        </p>
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
  { title: 'HOF Its ID', value: 'ItsID' },
  { title: 'HOF', value: 'Household' },
  { title: 'Size', value: 'Size' },
  { title: 'Members', value: 'Members' },
  { title: 'Primary Contact Phone', value: 'PrimaryContactPhone' },
  { title: 'Primary Contact Email', value: 'PrimaryContactEmail' },
  { title: '', value: 'Edit' },
]);

const data = computed(() => {
  return mumineen.value
    .filter(m => { return m.RelationshipToHeadOfHousehold_RelationshipTypeID === 1 })
    .map(m => {
      return {
        ...m,
        household: households.value.find(h => h.Household_HouseholdID === m.Household_HouseholdID),
      };
    })
    .map(m => {
      return {
        ItsID: m.ItsID,
        Household: `${m.Title ? m.Title + ' ' : ''}${m.FirstName} ${m.MiddleName ? m.MiddleName + ' ' : ''}${m.LastName}`,
        Members: mumineen.value.filter(i => { return m.Household_HouseholdID === i.Household_HouseholdID }),
        PrimaryContactPhone: mumineen.value.find(i => { return m.household?.PrimaryThaaliContact_JamaatMemberID === i.JamaatMemberID })?.Phone,
        PrimaryContactEmail: mumineen.value.find(i => { return m.household?.PrimaryThaaliContact_JamaatMemberID === i.JamaatMemberID })?.Email,
      }
    });
});

const editItem = (item) => {
  alert('TODO: route to edit mumineen screen');
};

// Data
const households = ref([]);
const mumineen = ref([]);

onMounted(async () => {
  if (store.households === null || store.households.length === 0) {
    loading.value = true;
    await store.getHouseholdList();
    loading.value = false;
  }
  households.value = store.households;

  if (store.mumineen === null || store.mumineen.length === 0) {
    loading.value = true;
    await store.getMumineenList();
    loading.value = false;
  }
  mumineen.value = store.mumineen;
});
</script>

<style scoped>
.v-text-field {
  max-height: 75px;
  max-width: 500px;
  overflow: hidden;
}
</style>