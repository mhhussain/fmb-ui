<template>
  <v-card>
    <v-container class="bg-surface-variant">
      <v-row>
        <v-col class="text-center">Monday</v-col>
        <v-col class="text-center">Tuesday</v-col>
        <v-col class="text-center">Wednesday</v-col>
        <v-col class="text-center">Thursday</v-col>
        <v-col class="text-center">Friday</v-col>
        <v-col class="text-center">Saturday</v-col>
        <v-col class="text-center">Sunday</v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">{{ props.week.mondayItemCount }}</v-col>
        <v-col class="text-center">{{ props.week.tuesdayItemCount }}</v-col>
        <v-col class="text-center">{{ props.week.wednesdayItemCount }}</v-col>
        <v-col class="text-center">{{ props.week.thursdayItemCount }}</v-col>
        <v-col class="text-center">{{ props.week.fridayItemCount }}</v-col>
        <v-col class="text-center">{{ props.week.saturdayItemCount }}</v-col>
        <v-col class="text-center">{{ props.week.sundayItemCount }}</v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
const props = defineProps(['week']);
</script>
