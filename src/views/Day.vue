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

        <n-space class="day-container" vertical>
            <n-space class="menu-container" vertical>
                <h3 style="font-weight: bold;">Menu</h3>
                <n-divider></n-divider>
                <MenuListItem v-for="item in menuData.menu" :key="item.dailyMenuItemId" :name="item.description" />
                <n-divider></n-divider>
                <n-button class="add-menu-item-button" type="info" dashed>
                    Add Menu Item
                </n-button>
                <n-divider></n-divider>
            </n-space>
            
            <n-space class="daily-preferences-container" vertical>
                <h3 style="font-weight: bold;">Daily Preferences</h3>
                <n-alert v-if="!pastCutoffOrDate" type="warning">Thaali cutoff has not been reached for this day, menu preferences are not final.</n-alert>
                <n-space horizontal>
                    <n-text>Group by:</n-text>
                    <n-button info ghost round>None</n-button>
                    <n-button info ghost round>Size</n-button>
                    <n-button info ghost round>Zone</n-button>
                    <n-button info ghost round>Status</n-button>
                </n-space>
                <n-data-table :columns="dailyPreferencesColumns" :data="dailyPreferences" :row-class-name="rowClass" :pagination="dailyPreferencesPagination" />
                
                <h3 style="font-weight: bold;">Opted Out</h3>
                <n-data-table :columns="dailyPreferencesColumns" :data="optedOutDailyPreferences" :pagination="optedOutDailyPreferencesPagination" />
            </n-space>
        </n-space>
    </div>
</template>

<script setup>
import { h, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { DateTime } from 'luxon'
import { Calendar } from '@vicons/ionicons5'
import { NButton } from 'naive-ui'

import MenuListItem from '@/components/atoms/MenuListItem.vue'

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
};

const dailyPreferencesColumns = [
    {
        key: 'thaaliContainerNumber',
        title: 'No.',
        width: 30
    },
    {
        key: 'size',
        title: 'Size',
        className: 'size',
        width: 30
    },
    {
        key: 'zoneName',
        title: 'Zone',
        width: 50,
        ellipsis: {
            tooltip: true
        }
    },
    {
        key: 'thaaliContactName',
        title: 'Household',
        width: 100,
        ellipsis: {
            tooltip: true
        }
    },
    {
        key: 'status',
        title: 'Status',
        className: 'status',
        width: 50
    },
    {
        key: 'edit',
        title: '',
        width: 25,
        render: (row) => {
            return h(NButton, {
                size: 'small',
                text: true,
                onClick: () => {
                    console.log(row)
                },
            }, {
                default: () => 'Edit'
            })
        }
    }
];

const rowClass = (row) => {
    const classes = [];
    if (row.status === 'Missing') {
        classes.push('missing-thaali');
    }

    // This will set the Size column to italic if the household has not updated their preference
    // Once automation is setup to generate fills for each day, all rows will be updated.
    // Once automation is run, no more rows should be italicized. This should be an indication
    // that cutoff and automation is complete and counts have been finalized.
    if (!row.updated) {
        classes.push('default-preference');
    }
    return classes;
}

const dailyPreferencesPagination = ref({
    pageSize: 10,
});

const optedOutDailyPreferencesPagination = ref({
    pageSize: 10,
});

const menuData = ref({
    weekId: 0,
    weekStart: '',
    cutoffDateAndTime: '',
    fillScheduleId: 0,
    thaaliCoordinatorId: 0,
    thaaliCoordinatorName: '',
    menuId: 0,
    menuDate: '',
    menu: [],
    dailyPreferences: [],
});

const dailyPreferences = computed(() => {
    return menuData.value.dailyPreferences.filter(item => item.isOptedIn).sort((a, b) => a.thaaliContainerNumber - b.thaaliContainerNumber);
});

const optedOutDailyPreferences = computed(() => {
    return menuData.value.dailyPreferences.filter(item => !item.isOptedIn).sort((a, b) => a.thaaliContainerNumber - b.thaaliContainerNumber);
});

const pastCutoffOrDate = computed(() => {
    const menuDate = DateTime.fromISO(menuData.value.menuDate);
    const cutoff = DateTime.fromISO(menuData.value.cutoffDateAndTime);
    const now = DateTime.now();
    return cutoff < now.minus({ hours: 5 }) || menuDate < now.minus({ hours: 5 });
});

onMounted(async () => {
    const response = await fetch(`https://us-central1-xyz-moohh-fmbmobile-test.cloudfunctions.net/app/api/v2/admin/week/${route.params.startDate}/${day}`);
    const data = await response.json();
    menuData.value.weekId = data.weekId;
    menuData.value.weekStart = data.weekStart;
    menuData.value.cutoffDateAndTime = data.cutoffDateAndTime;
    menuData.value.fillScheduleId = data.fillScheduleId;
    menuData.value.thaaliCoordinatorId = data.thaaliCoordinatorId;
    menuData.value.thaaliCoordinatorName = data.thaaliCoordinatorName;
    menuData.value.menuId = data.menuId;
    menuData.value.menuDate = data.menuDate;
    menuData.value.menu = data.menu;
    menuData.value.dailyPreferences = data.dailyPreferences;
});


</script>

<style scoped>
.title-container {
    display: flex;
    align-items: end;
    padding-bottom: 10px;
}

.day-container {
    padding: 24px;
    border: 2px solid #E7E7E7;
    border-radius: 2px;
}

.menu-container {
    max-width: 50%;
    padding-bottom: 24px;
}

.daily-preferences-container {
    /* max-width: 70%; */
}

.n-divider {
    margin: 0;
}

.add-menu-item-button {
    width: 100%;
}

:deep(.size) {
    font-weight: bold;
}

:deep(.missing-thaali .status) {
    color: red;
    font-weight: bold;
}

:deep(.default-preference .size) {
    font-weight: normal;
    font-style: italic;
}
</style>