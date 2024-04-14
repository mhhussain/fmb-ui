<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <!-- Header with logo and greeting -->
        <v-row>
          <v-col cols="12" sm="6">
            Dashboard
          </v-col>
          <v-col cols="12" sm="6">
            Filter Period
          </v-col>
        </v-row>

        <!-- Stats cards row -->
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="12" md="4">
                <v-card class="mx-auto" outlined>
                  <v-card-text class="d-flex flex-column align-center">
                    <span class="text-subtitle-1 grey--text">Total Thaalis</span>
                    <span class="text-h4 font-weight-bold orange--text">327</span>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card>
                  <v-card-text class="d-flex flex-column align-center">
                    <span class="text-subtitle-1 grey--text">Total Spent</span>
                    <span class="text-h4 font-weight-bold orange--text">2,000</span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card>
                  Overview Chart
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title>
                Breakdown
                <v-spacer></v-spacer>
                <v-btn text color="primary">See details</v-btn>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="items"
                class="elevation-1"
                :hide-default-footer="true"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              Pie Chart
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              Budget Summary Graph
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const headers = ref([
  { text: 'Date', value: 'date' },
  { text: 'Menu', value: 'menu' },
  { text: 'Vendor', value: 'vendor' },
  { text: 'Total Cost', value: 'cost' },
]);

const items = ref([
  { date: 'Mon, Aug 21', menu: 'Gosht Aloo Roti', vendor: 'Nisreen Binderwala', cost: '$500.00' },
  { date: 'Tue, Aug 22', menu: 'Chicken Pasta', vendor: 'Nisreen Binderwala', cost: '$600.00' },
  { date: 'Tue, Aug 22', menu: 'Chicken Pasta', vendor: 'Nisreen Binderwala', cost: '$600.00' },
  { date: 'Tue, Aug 22', menu: 'Chicken Pasta', vendor: 'Nisreen Binderwala', cost: '$600.00' },
  { date: 'Tue, Aug 22', menu: 'Chicken Pasta', vendor: 'Nisreen Binderwala', cost: '$600.00' },
  { date: 'Tue, Aug 22', menu: 'Chicken Pasta', vendor: 'Nisreen Binderwala', cost: '$600.00' },
  { date: 'Tue, Aug 22', menu: 'Chicken Pasta', vendor: 'Nisreen Binderwala', cost: '$600.00' },
  { date: 'Tue, Aug 22', menu: 'Chicken Pasta', vendor: 'Nisreen Binderwala', cost: '$600.00' },
])
</script>

<style scoped>
.v-card {
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
  transition: box-shadow 0.3s;
}

.v-card:hover {
  box-shadow: 1px 1px 1px 10px rbga(0,0,0,0.4);
}

.v-card-text {
  padding: 1rem;
}

.orange--text {
  color: #FFA726;
}

.grey--text {
  color: #757575;
}
</style>
