<template>
    <h3 style="font-weight: bold;">Count Summary</h3>
    <n-card>
        <n-grid :x-gap="12" :y-gap="12" :cols="8">
            <n-gi :span="1">
                X
            </n-gi>
            <n-gi :span="7">
                <n-progress
                    color="gray"
                    border-radius="12px 0 12px 0"
                    fill-border-radius="12px 0 12px 0"
                    :height="24"
                    :percentage="optedOutDailyPreferences.length / (dailyPreferences.length + optedOutDailyPreferences.length) * 100"
                >
                    {{ optedOutDailyPreferences.length }}
                </n-progress>
            </n-gi>
            <n-gi :span="1">
                A
            </n-gi>
            <n-gi :span="7">
                <n-progress
                    status="info"
                    border-radius="12px 0 12px 0"
                    fill-border-radius="12px 0 12px 0"
                    :height="24"
                    :percentage="dailyPreferences.filter(p => p.size.includes('A')).length / (dailyPreferences.length + optedOutDailyPreferences.length) * 100"
                >
                    {{ dailyPreferences.filter(p => p.size.includes('A')).length }}
                </n-progress>
            </n-gi>
            <n-gi :span="1">
                B
            </n-gi>
            <n-gi :span="7">
                <n-progress
                    status="success"
                    border-radius="12px 0 12px 0"
                    fill-border-radius="12px 0 12px 0"
                    :height="24"
                    :percentage="dailyPreferences.filter(p => p.size.includes('B')).length / (dailyPreferences.length + optedOutDailyPreferences.length) * 100"
                >
                    {{ dailyPreferences.filter(p => p.size.includes('B')).length }}
                </n-progress>
            </n-gi>
            <n-gi :span="1">
                C
            </n-gi>
            <n-gi :span="7">
                <n-progress
                    status="warning"
                    border-radius="12px 0 12px 0"
                    fill-border-radius="12px 0 12px 0"
                    :height="24"
                    :percentage="dailyPreferences.filter(p => p.size.includes('C')).length / (dailyPreferences.length + optedOutDailyPreferences.length) * 100"
                >
                    {{ dailyPreferences.filter(p => p.size.includes('C')).length }}
                </n-progress>
            </n-gi>
            <n-gi :span="1">
                D
            </n-gi>
            <n-gi :span="7">
                <n-progress
                    status="error"
                    border-radius="12px 0 12px 0"
                    fill-border-radius="12px 0 12px 0"
                    :height="24"
                    :percentage="dailyPreferences.filter(p => p.size.includes('D')).length / (dailyPreferences.length + optedOutDailyPreferences.length) * 100"
                >
                    {{ dailyPreferences.filter(p => p.size.includes('D')).length }}
                </n-progress>
            </n-gi>
            <n-gi :span="1">
                Total
            </n-gi>
            <n-gi :span="7">
                <n-progress
                    status="success"
                    border-radius="12px 0 12px 0"
                    fill-border-radius="12px 0 12px 0"
                    :height="24"
                    :percentage="dailyPreferences.length / (dailyPreferences.length + optedOutDailyPreferences.length) * 100"
                >
                    {{ dailyPreferences.length }}
                </n-progress>
            </n-gi>
        </n-grid>
    </n-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    dailyPreferences: {
        type: Array,
        required: true
    },
    optedOutDailyPreferences: {
        type: Array,
        required: true
    }
});

const dailyPreferences = computed(() => props.dailyPreferences);
const optedOutDailyPreferences = computed(() => props.optedOutDailyPreferences);

</script>

<style scoped>
.n-card {
    background: #f5f5f5;
    border: 0;
}
</style>