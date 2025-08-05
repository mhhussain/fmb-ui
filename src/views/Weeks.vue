<template>
    <div>
        <n-space class="title-container" justify="space-between" horizontal>
            <h1>Weekly Menus</h1>
            <n-button>
                Add Weekly Menu
            </n-button>
        </n-space>
        <n-card v-on:click="navigateToWeek(week)" v-for="week in weeks" :key="week.weekId" vertical>
            <template #header>
                <n-space justify="space-between" horizontal>
                    <n-space align="center">
                        <n-icon size="32">
                            <Calendar />
                        </n-icon>
                        <h3>
                            {{ convertToLocalDate(week.weekStart).toFormat('MMM d, yyyy') }}
                        </h3>
                    </n-space>
                    <n-space>
                        <n-text>
                            Cutoff: {{ convertToLocalDate(week.cutoffDateAndTime).toFormat('MMM d, h:mm a') }}
                        </n-text>
                    </n-space>
                </n-space>
            </template>
            <n-grid :cols="3">
                <n-grid-item v-for="menu in week.menus" :key="menu.menuId">
                    <n-card class="menu-card">
                        <n-space vertical>
                            <h3>{{ convertToLocalDate(menu.menuDate).toFormat('EEE, MMM d') }}</h3>
                            <n-text v-for="item in menu.menu" :key="item.dailyMenuItemId">
                                {{ item.description }}
                            </n-text>
                        </n-space>
                    </n-card>
                </n-grid-item>
            </n-grid>
        </n-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Calendar } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';

import { convertToLocalDate, apiUrl } from '@/utils/helpers';

const router = useRouter();
const weeks = ref([]);

onMounted(async () => {
    const response = await fetch(`${apiUrl}/api/v2/admin/weeks`);
    const data = await response.json();
    weeks.value = data;
});

const navigateToWeek = (week) => {
    router.push(`/week/${convertToLocalDate(week.weekStart).toFormat('yyyyMMdd')}`);
}
</script>

<style scoped>
.menu-card {
    border: 0;
}

.menu-card :deep(h3) {
    font-weight: bold;
}
</style>