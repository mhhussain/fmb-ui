<template>
    <n-space v-on:click="onClickDay(dayName)" :class="dayData.name ? 'daily-menu-container' : 'daily-menu-container-missing'">
        <n-card>
            <template #header>
                <span class="day-header">
                    {{ dayData.date ? `${dayName}, ${dayData.date.toFormat('MMM d')}` : dayName }}
                </span>
            </template>
            <n-space v-for="menu in dayData.menu" :key="menu.description">
                <n-text>{{ menu.description }}</n-text>
            </n-space>
            <n-space v-if="!dayData.menu || dayData.menu.length === 0">
                <n-text class="no-thaali-text">No Thaali</n-text>
            </n-space>
        </n-card>
    </n-space>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    dayName: {
        type: String,
        required: true,
    },
    weekStart: {
        type: Object,
        required: true,
    },
    dayData: {
        type: Object,
        required: true,
    }
});

const router = useRouter();

const onClickDay = (dayName) => {
    if (dayName) {
        router.push(`/week/${props.weekStart.toFormat('yyyyLLdd')}/${dayName}`)
    }
};

</script>

<style scoped>
.daily-menu-container {
    width: 100%;
    border-top: 10px solid #659DF2;
    border-bottom: 2px solid #659DF2;
    border-left: 2px solid #659DF2;
    border-right: 2px solid #659DF2;
    border-radius: 2px;
}

.daily-menu-container-missing {
    width: 100%;
    border-top: 2px dotted #659DF2;
    border-bottom: 2px dotted #659DF2;
    border-left: 2px dotted #659DF2;
    border-right: 2px dotted #659DF2;
    border-radius: 4px;
}

.day-header {
    color: #659DF2;
    font-weight: bold;
}

.no-thaali-text {
    font-style: italic;
}

.n-card {
    background-color: #F5F5F5;
    border: 0;
}
</style>