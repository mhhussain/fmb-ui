<template>
  <n-space justify="space-between" horizontal>
      <n-text>
          {{ name }}
      </n-text>
      <n-space>
          <n-text underline>edit</n-text>
          <n-text underline>remove</n-text>
      </n-space>
  </n-space>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
</style>