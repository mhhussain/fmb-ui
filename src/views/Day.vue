<template>
    <div>
        <n-space class="title-container">
            <n-icon size="32">
                <Calendar />
            </n-icon>
            <h1>
                {{ day }}, {{ date.toFormat('MMM d') }}
            </h1>
        </n-space>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { DateTime } from 'luxon'
import { Calendar } from '@vicons/ionicons5'

const route = useRoute();
const day = route.params.day.charAt(0).toUpperCase() + route.params.day.slice(1);
let date;

switch (day) {
    case 'Monday':
        date = DateTime.fromFormat(route.params.startDate, 'yyyyLLdd');
        break;
    case 'Tuesday':
        date = DateTime.fromFormat(route.params.startDate, 'yyyyLLdd').plus({ days: 1 });
        break;
    case 'Wednesday':
        date = DateTime.fromFormat(route.params.startDate, 'yyyyLLdd').plus({ days: 2 });
        break;
    case 'Thursday':
        date = DateTime.fromFormat(route.params.startDate, 'yyyyLLdd').plus({ days: 3 });
        break;
    case 'Friday':
        date = DateTime.fromFormat(route.params.startDate, 'yyyyLLdd').plus({ days: 4 });
        break;
    case 'Saturday':
        date = DateTime.fromFormat(route.params.startDate, 'yyyyLLdd').plus({ days: 5 });
        break;
}

</script>

<style scoped>
.title-container {
    display: flex;
    align-items: end;
    padding-bottom: 10px;
}
</style>