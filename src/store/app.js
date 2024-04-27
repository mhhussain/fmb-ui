// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    mumineen: [],
    households: [],
    vendors: [],
    menuItems: [],
    thaali: {},
  }),
  actions: {
    async getMumineenList() {
      try {
        const response = await fetch(`https://us-central1-xyz-moohh-fmbmobile-test.cloudfunctions.net/app/api/v1/admin/mumineen`);
        this.mumineen = await response.json();
      } catch (e) {
        console.error('An error occurred while fetching data: ', e);
      }
    },
    async lookupThaali(thaali) {
      try {
        const response = await fetch(`https://us-central1-xyz-moohh-fmbmobile-test.cloudfunctions.net/app/api/v1/lookup/${thaali}`);
        this.thaali = await response.json();
      } catch (e) {
        console.error('An error occurred while fetching data: ', e);
      }
    },
    async getVendorList() {
      try {
        const response = await fetch(`https://us-central1-xyz-moohh-fmbmobile-test.cloudfunctions.net/app/api/v1/admin/vendor`);
        this.vendors = await response.json();
      } catch (e) {
        console.error('An error occurred while fetching data: ', e);
      }
    },
    async getMenuItemList() {
      try {
        const response = await fetch(`https://us-central1-xyz-moohh-fmbmobile-test.cloudfunctions.net/app/api/v1/admin/item`);
        this.menuItems = await response.json();
      } catch (e) {
        console.error('An error occurred while fetching data: ', e);
      }
    },
  }
})
