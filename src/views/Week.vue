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
                <n-date-picker
                    type="datetime"
                    format="EEE, LLL d, h:mm a"
                    v-model:value="week.cutoffTimestamp"
                />
                <n-card title="Stats">
                    <n-grid :cols="6" :x-gap="12" :y-gap="12">
                        <n-grid-item :span="5">
                            <n-text>Total Thaalis:</n-text>
                        </n-grid-item>
                        <n-grid-item :span="1">
                            {{ week.stats?.totalThaalis || 0 }}
                        </n-grid-item>
                        <n-grid-item :span="5">
                            <n-text>Max Day:</n-text>
                        </n-grid-item>
                        <n-grid-item :span="1">
                            {{ week.stats?.maxDay || 0 }}
                        </n-grid-item>
                    </n-grid>
                </n-card>
            </n-space>
        </n-space>
    </div>
</template>

<script setup>
import { DateTime } from 'luxon'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  Calendar,
} from '@vicons/ionicons5'
import axios from 'axios'

import { apiUrl, convertToLocalDate } from '@/utils/helpers'

import DayCard from '@/components/molecules/DayCard.vue'

const route = useRoute();
const weekStart = DateTime.fromFormat(route.params.startDate, 'yyyyLLdd');

const week = ref({
    weekStart: '',
    cutoffDateAndTime: '',
    cutoffTimestamp: 0,
    stats: {},
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {},
})

onMounted(async () => {
    const response = await axios.get(`${apiUrl}/api/v2/admin/week/${weekStart.toFormat('yyyyLLdd')}`);
    week.value.weekStart = convertToLocalDate(response.data[0].weekStart);
    week.value.cutoffDateAndTime = response.data[0].cutoffDateAndTime;
    week.value.cutoffTimestamp = convertToLocalDate(response.data[0].cutoffDateAndTime).toMillis();

    // Monday
    const mondayMenu = response.data[0].menus.find(menu => convertToLocalDate(menu.menuDate).weekday === 1);
    week.value.monday = mondayMenu ? {
        name: 'Monday',
        date: convertToLocalDate(mondayMenu.menuDate),
        stats: {
            totalThaalis: mondayMenu.total,
            totalPreferenceUpdates: 0,
            totalOptOuts: mondayMenu.x,
            totalASizeThaalis: mondayMenu.a,
            totalBSizeThaalis: mondayMenu.b,
            totalCSizeThaalis: mondayMenu.c,
            totalDSizeThaalis: mondayMenu.d,
            totalMehmanThaalis: 0,
        },
        menu: mondayMenu.menu,
    } : {};

    // Tuesday
    const tuesdayMenu = response.data[0].menus.find(menu => convertToLocalDate(menu.menuDate).weekday === 2);
    week.value.tuesday = tuesdayMenu ? {
        name: 'Tuesday',
        date: convertToLocalDate(tuesdayMenu.menuDate),
        stats: {
            totalThaalis: tuesdayMenu.total,
            totalPreferenceUpdates: 0,
            totalOptOuts: tuesdayMenu.x,
            totalASizeThaalis: tuesdayMenu.a,
            totalBSizeThaalis: tuesdayMenu.b,
            totalCSizeThaalis: tuesdayMenu.c,
            totalDSizeThaalis: tuesdayMenu.d,
            totalMehmanThaalis: 0,
        },
        menu: tuesdayMenu.menu,
    } : {};

    // Wednesday
    const wednesdayMenu = response.data[0].menus.find(menu => convertToLocalDate(menu.menuDate).weekday === 3);
    week.value.wednesday = wednesdayMenu ? {
        name: 'Wednesday',
        date: convertToLocalDate(wednesdayMenu.menuDate),
        stats: {
            totalThaalis: wednesdayMenu.total,
            totalPreferenceUpdates: 0,
            totalOptOuts: wednesdayMenu.x,
            totalASizeThaalis: wednesdayMenu.a,
            totalBSizeThaalis: wednesdayMenu.b,
            totalCSizeThaalis: wednesdayMenu.c,
            totalDSizeThaalis: wednesdayMenu.d,
            totalMehmanThaalis: 0,
        },
        menu: wednesdayMenu.menu,
    } : {};

    // Thursday
    const thursdayMenu = response.data[0].menus.find(menu => convertToLocalDate(menu.menuDate).weekday === 4);
    week.value.thursday = thursdayMenu ? {
        name: 'Thursday',
        date: convertToLocalDate(thursdayMenu.menuDate),
        stats: {
            totalThaalis: thursdayMenu.total,
            totalPreferenceUpdates: 0,
            totalOptOuts: thursdayMenu.x,
            totalASizeThaalis: thursdayMenu.a,
            totalBSizeThaalis: thursdayMenu.b,
            totalCSizeThaalis: thursdayMenu.c,
            totalDSizeThaalis: thursdayMenu.d,
            totalMehmanThaalis: 0,
        },
        menu: thursdayMenu.menu,
    } : {};

    // Friday
    const fridayMenu = response.data[0].menus.find(menu => convertToLocalDate(menu.menuDate).weekday === 5);
    week.value.friday = fridayMenu ? {
        name: 'Friday',
        date: convertToLocalDate(fridayMenu.menuDate),
        stats: {
            totalThaalis: fridayMenu.total,
            totalPreferenceUpdates: 0,
            totalOptOuts: fridayMenu.x,
            totalASizeThaalis: fridayMenu.a,
            totalBSizeThaalis: fridayMenu.b,
            totalCSizeThaalis: fridayMenu.c,
            totalDSizeThaalis: fridayMenu.d,
            totalMehmanThaalis: 0,
        },
        menu: fridayMenu.menu,
    } : {};

    // Saturday
    const saturdayMenu = response.data[0].menus.find(menu => convertToLocalDate(menu.menuDate).weekday === 6);
    week.value.saturday = saturdayMenu ? {
        name: 'Saturday',
        date: convertToLocalDate(saturdayMenu.menuDate),
        stats: {
            totalThaalis: saturdayMenu.total,
            totalPreferenceUpdates: 0,
            totalOptOuts: saturdayMenu.x,
            totalASizeThaalis: saturdayMenu.a,
            totalBSizeThaalis: saturdayMenu.b,
            totalCSizeThaalis: saturdayMenu.c,
            totalDSizeThaalis: saturdayMenu.d,
            totalMehmanThaalis: 0,
        },
        menu: saturdayMenu.menu,
    } : {};

    // Stats
    week.value.stats = {
        // totalThaalis: week.value.monday.stats.totalThaalis + week.value.tuesday.stats.totalThaalis + week.value.wednesday.stats.totalThaalis + week.value.thursday.stats.totalThaalis + week.value.friday.stats.totalThaalis + week.value.saturday.stats.totalThaalis,
        // maxDay: Math.max(week.value.monday.stats.totalThaalis, week.value.tuesday.stats.totalThaalis, week.value.wednesday.stats.totalThaalis, week.value.thursday.stats.totalThaalis, week.value.friday.stats.totalThaalis, week.value.saturday.stats.totalThaalis)
        totalThaalis: 0,
        maxDay: 0,
    };
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
}

.sidebar-container .n-card {
    width: 23vw;
    background-color: #F5F5F5;
    border: 2px solid #E7E7E7;
    border-radius: 2px;
}

.sidebar-container .n-date-picker {
    width: 23vw;
}

.daily-menus-container {
    width: 45vw;
}
</style>