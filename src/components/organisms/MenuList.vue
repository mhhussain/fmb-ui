<template>
    <h3 style="font-weight: bold;">Menu</h3>
    <n-divider></n-divider>
    <MenuListItem v-for="item in menu" :key="item.dailyMenuItemId" :name="item.description" />
    <n-divider></n-divider>
    <n-button class="add-menu-item-button" type="info" dashed>
        Add Menu Item
    </n-button>
    <n-divider></n-divider>
</template>

<script setup>
import { computed } from 'vue';
import MenuListItem from '@/components/molecules/MenuListItem.vue';

const props = defineProps({
    menu: {
        type: Array,
        required: true
    }
});

const menu = computed(() => props.menu);
</script>

<style scoped>
.add-menu-item-button {
    width: 100%;
}
</style>