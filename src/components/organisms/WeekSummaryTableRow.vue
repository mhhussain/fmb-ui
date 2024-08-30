<template>
  <span>Monday {{ props.week.mondayItemCount }}</span>
  <span>Tuesday {{ props.week.tuesdayItemCount }}</span>
  <span>Wednesday {{ props.week.wednesdayItemCount }}</span>
  <span>Thursday {{ props.week.thursdayItemCount }}</span>
  <span>Friday {{ props.week.fridayItemCount }}</span>
  <span>Saturday {{ props.week.saturdayItemCount }}</span>
  <span>Sunday {{ props.week.sundayItemCount }}</span>
</template>

<script setup>
const props = defineProps(['week']);
</script>
