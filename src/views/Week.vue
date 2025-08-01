<template>
    <div class="week-container">
        <n-space class="title-container">
            <n-icon size="32">
                <Calendar />
            </n-icon>
            <h1>
                Week of {{ weekStart.toFormat('MMM d, yyyy') }}
            </h1>
        </n-space>
        <n-space horizontal>
            <n-space vertical class="daily-menus-container">
                <DayCard dayName="Monday" :weekStart="weekStart" :dayData="week.monday" />
                <DayCard dayName="Tuesday" :weekStart="weekStart" :dayData="week.tuesday" />
                <DayCard dayName="Wednesday" :weekStart="weekStart" :dayData="week.wednesday" />
                <DayCard dayName="Thursday" :weekStart="weekStart" :dayData="week.thursday" />
                <DayCard dayName="Friday" :weekStart="weekStart" :dayData="week.friday" />
                <DayCard dayName="Saturday" :weekStart="weekStart" :dayData="week.saturday" />
            </n-space>
            
            <n-space class="sidebar-container">
                <n-card bordered="true" title="Stats">
                    <n-space>
                        <n-space>
                            <n-text>Total Thaalis</n-text>
                        </n-space>
                    </n-space>
                </n-card>
            </n-space>
        </n-space>
    </div>
</template>

<script setup>
import { DateTime } from 'luxon'
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  Calendar,
} from '@vicons/ionicons5'
import DayCard from '@/components/molecules/DayCard.vue'

import { sampleWeekData } from '@/utils/sample-data'

const route = useRoute();
const weekStart = DateTime.fromFormat(route.params.startDate, 'yyyyLLdd');

const week = reactive(sampleWeekData(weekStart));

onMounted(() => {
    // TODO: Get week data from backend
});

</script>

<style scoped>
.title-container {
    display: flex;
    align-items: end;
    padding-bottom: 10px;
}

.sidebar-container {
    width: 23vw;
    border: 2px solid #E7E7E7;
    border-radius: 2px;
}

.daily-menus-container {
    width: 45vw;
}

</style>