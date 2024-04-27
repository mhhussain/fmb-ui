<template>
  <v-app>
    <v-select
      label="Vendor"
      :items="vendorNames"
      item-title="VendorName"
      item-value="VendorID"
      v-model="selectedVendor"
    />
    <v-checkbox
      label="Show Inactive"
      v-model="showInactive"
    />
    <v-data-table
      :headers="headers"
      :items="data"
      class="elevation-1"
      :hide-default-footer="true"
      :loading="loading"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item.VendorName="{ item }">
        {{ item.VendorName }}
        <v-icon
          class="me-2"
          size="small"
          @click="editVendor(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
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
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';

const store = useAppStore();

const loading = ref(false);
const selectedVendor = ref('All');
const showInactive = ref(false);

const headers = ref([
  { title: 'Description', value: 'Description' },
  { title: 'Vendor Name', value: 'VendorName' },
  { title: 'Units', value: 'Units' },
  { title: 'UnitCost', value: 'UnitCost' },
  { title: 'Actions', value: 'actions' },
]);

const data = computed(() => {
  return menuItems.value
    // only show active items, unless checkbox is checked
    .filter(i => { return showInactive.value || i.Active })
    // only show filtered items by vendor, unless 'All' is selected
    .filter(i => { return selectedVendor.value === 'All' || selectedVendor.value === i.Vendor_VendorID })
    .map(i => {
      return {
        Description: i.Description,
        VendorID: vendors.value.find(v => v.VendorID === i.Vendor_VendorID).VendorID,
        VendorName: vendors.value.find(v => v.VendorID === i.Vendor_VendorID).VendorName,
        Units: i.Units,
        UnitCost: i.UnitCost,
      }
    });
});

const vendorNames = computed(() => {
  return [
    { VendorID: 'All', VendorName: 'All' },
    ...vendors.value.map(v => {
      return {
        VendorID: v.VendorID,
        VendorName: v.VendorName,
      };
    })
  ];
});

const router = useRouter();

function editVendor(item) {
  alert('TODO: route to edit vendor screen');
  // router.push({ name: '', params: { id: item.id } });
};

function editItem(item) {
  alert('TODO: route to edit item screen');
  // router.push({ name: '', params: { id: item.id } });
};

// Data
const vendors = ref([]);
const menuItems = ref([]);

onMounted(async () => {
  // get vendors
  if (store.vendors === null || store.vendors.length === 0) {
    loading.value = true;
    await store.getVendorList();
    loading.value = false;
  }
  vendors.value = store.vendors;
  
  // get menu items
  if (store.menuItems === null || store.menuItems.length === 0) {
    loading.value = true;
    await store.getMenuItemList();
    loading.value = false;
  }
  menuItems.value = store.menuItems;
});
</script>

<style scoped>
.v-select {
  max-height: 75px;
  max-width: 500px;
  overflow: hidden;
}
</style>