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
                <MenuListItem name="Daal Gosht" />
                <n-divider></n-divider>
                <MenuListItem name="Roti" />
                <n-divider></n-divider>
                <n-button class="add-menu-item-button" type="info" dashed>
                    Add Menu Item
                </n-button>
                <n-divider></n-divider>
            </n-space>
            
            <n-space class="daily-preferences-container" vertical>
                <h3 style="font-weight: bold;">Daily Preferences</h3>
                <n-space horizontal>
                    <n-text>Group by:</n-text>
                    <n-button info ghost round>None</n-button>
                    <n-button info ghost round>Size</n-button>
                    <n-button info ghost round>Zone</n-button>
                    <n-button info ghost round>Status</n-button>
                </n-space>
                <n-data-table :columns="dailyPreferencesColumns" :data="dailyPreferencesData" :row-class-name="rowClass" />
            </n-space>
        </n-space>
    </div>
</template>

<script setup>
import { h } from 'vue'
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
        key: 'no',
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
        key: 'zone',
        title: 'Zone',
        width: 50,
        ellipsis: {
            tooltip: true
        }
    },
    {
        key: 'household',
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
    if (row.default) {
        classes.push('default-preference');
    }
    return classes;
}

const dailyPreferencesData = [
    {
        no: 57,
        size: 'B',
        default: true,
        zone: 'F. Hills Zone 4',
        household: 'Shk. Mustafa Hussain',
        status: 'Missing',
    },
    {
        no: 57,
        size: 'B',
        default: false,
        zone: 'F. Hills Zone 4',
        household: 'Shk. Mustafa Hussain',
        status: 'Checked in',
    },
    {
        no: 57,
        size: 'B',
        default: false,
        zone: 'F. Hills Zone 4',
        household: 'Shk. Mustafa Hussain',
        status: 'Checked in',
    },
    {
        no: 97,
        size: 'C',
        default: true,
        zone: 'F. Hills Zone 4',
        household: 'Shk. Mustafa Hussain',
        status: 'Missing',
    },
    {
        no: 57,
        size: 'B',
        default: false,
        zone: 'F. Hills Zone 4',
        household: 'Shk. Mustafa Hussain',
        status: 'Checked in',
    },
    {
        no: 57,
        size: 'B',
        default: false,
        zone: 'F. Hills Zone 4',
        household: 'Shk. Mustafa Hussain',
        status: 'Checked in',
    },
    {
        no: 57,
        size: 'B',
        default: false,
        zone: 'F. Hills Zone 4',
        household: 'Shk. Mustafa Hussain',
        status: 'Checked in',
    },
    {
        no: 57,
        size: 'B',
        default: false,
        zone: 'F. Hills Zone 4',
        household: 'Shk. Mustafa Hussain',
        status: 'Checked in',
    },
    {
        no: 57,
        size: 'B',
        default: false,
        zone: 'F. Hills Zone 4',
        household: 'Shk. Mustafa Hussain',
        status: 'Checked in',
    },
]

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