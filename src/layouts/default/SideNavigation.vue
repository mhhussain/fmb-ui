<template>
  <v-navigation-drawer>
    <v-list-item
      v-for="link in links"
      :key="link.title"
      :to="link.path"
      link
      :value="$route.path === link.path"
    >
      {{ link.title }}
    </v-list-item>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';

const links = ref([
  { title: 'Menu', path: 'menu'},
])
</script>
