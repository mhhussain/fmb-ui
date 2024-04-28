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
      <template v-slot:item.Address="{ item }">
        <p>{{ item.StreetAddress1 }}</p>
        <p>{{ item.StreetAddress2 }}</p>
        <p>{{ item.City }}, {{ item.State }} {{ item.PostalCode }}</p>
      </template>
      <template v-slot:item.Preferences="{ item }">
        <v-icon :color="item.MondayOptIn ? 'green' : 'red'">{{ item.MondayOptIn ? `mdi-alpha-${item.MondayPreference.toLowerCase()}` : 'mdi-alpha-x' }}</v-icon>
        <v-icon :color="item.WednesdayOptIn ? 'green' : 'red'">{{ item.WednesdayOptIn ? `mdi-alpha-${item.WednesdayPreference.toLowerCase()}` : 'mdi-alpha-x' }}</v-icon>
        <v-icon :color="item.SaturdayOptIn ? 'green' : 'red'">{{ item.SaturdayOptIn ? `mdi-alpha-${item.SaturdayPreference.toLowerCase()}` : 'mdi-alpha-x' }}</v-icon>
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
  { title: 'Thaali Number', value: 'ThaaliNumber' },
  // { title: 'HOF Its ID', value: 'HoHITSID' },
  // { title: 'HOF', value: 'Household' },
  { title: 'Zone', value: 'Zone' },
  { title: 'Address', value: 'Address' },
  { title: 'Household Size', value: 'Size' },
  { title: 'Members', value: 'Members' },
  { title: 'Preferences', value: 'Preferences' },
  { title: '', value: 'Edit' },
]);

const data = computed(() => {
  return households.value
    .map(h => {
      return {
        ThaaliNumber: h.ThaaliNumber,
        HoHITSID: h.HoHITSID,
        Household: `${h.HoHFirstName} ${h.HoHLastName}`,
        Members: mumineen.value.filter(m => { return m.Household_HouseholdID === h.HouseholdID }),
        PrimaryContactPhone: h.PrimarayContactCellPhone,
        PrimaryContactEmail: h.PrimaryContactEmail,
        MondayOptIn: h.MondayOptIn === 1 ? true : false,
        MondayPreference: h.MondayPreference,
        WednesdayOptIn: h.WednesdayOptIn === 1 ? true : false,
        WednesdayPreference: h.WednesdayPreference,
        SaturdayOptIn: h.SaturdayOptIn === 1 ? true : false,
        SaturdayPreference: h.SaturdayPreference,
        StreetAddress1: h.StreetAddress1,
        StreetAddress2: h.StreetAddress2,
        City: h.City,
        State: h.State,
        PostalCode: h.PostalCode,
        Zone: h.Zone,
        ZoneCoordinator: `${h.ZoneCoordinatorFirstName} ${h.ZoneCoordinatorLastName}`
      }
    });
});

const editItem = (item) => {
  alert('TODO: route to edit household screen');
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