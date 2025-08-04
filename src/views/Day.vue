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
            <n-grid :x-gap="12" :y-gap="12" :cols="12">
                <n-gi :span="6">
                    <MenuList :menu="menuData.menu" />
                </n-gi>
                <n-gi :span="6">
                    <CountSummaryCard :dailyPreferences="dailyPreferences" :optedOutDailyPreferences="optedOutDailyPreferences" />
                </n-gi>
            </n-grid>
            
            <n-space class="daily-preferences-container" vertical>
                <h3 style="font-weight: bold;">Daily Preferences ({{ dailyPreferences.length }})</h3>
                <n-alert v-if="!pastCutoffOrDate" type="warning">Thaali cutoff has not been reached for this day, menu preferences are not final.</n-alert>
                <n-space horizontal>
                    <n-text>Filter by:</n-text>
                    <n-button round :type="currentFilter === 'none' ? 'info' : 'default'" @click="filter('none', 'none')">None</n-button>
                    <n-popover triggger="click" placement="bottom">
                        <template #trigger>
                            <n-button round :type="currentFilter === 'size' ? 'info' : 'default'" @click="filter('size', 'none')">Size</n-button>
                        </template>
                        <n-space>
                            <n-button info ghost round @click="filter('size', 'A')">A</n-button>
                            <n-button info ghost round @click="filter('size', 'B')">B</n-button>
                            <n-button info ghost round @click="filter('size', 'C')">C</n-button>
                            <n-button info ghost round @click="filter('size', 'D')">D</n-button>
                        </n-space>
                    </n-popover>
                    <n-popover triggger="click" placement="bottom">
                        <template #trigger>
                            <n-button round :type="currentFilter === 'zone' ? 'info' : 'default'" @click="filter('zone', 'none')">Zone</n-button>
                        </template>
                        <n-space>
                            <n-button info ghost round v-for="zone in zoneList" :key="zone" @click="filter('zone', zone)">{{ zone }}</n-button>
                        </n-space>
                    </n-popover>
                    <n-button info ghost round>Status</n-button>
                </n-space>
                <n-space>
                    <n-button secondary type="primary" @click="downloadCSV">Download CSV</n-button>
                </n-space>
                <n-data-table ref="dataTableRef" :columns="dailyPreferencesColumns" :data="dailyPreferences" :row-class-name="rowClass" :pagination="dailyPreferencesPagination" />
                
                <h3 style="font-weight: bold;">Opted Out ({{ optedOutDailyPreferences.length }})</h3>
                <n-data-table :columns="dailyPreferencesColumns" :data="optedOutDailyPreferences" :pagination="optedOutDailyPreferencesPagination" />

                <n-space horizontal>
                    <h3 style="font-weight: bold;">Defaulted Out ({{ defaultedOutDailyPreferences.length }})</h3>
                    <n-switch v-model:value="defaultedOutDailyPreferencesShow">
                        <template #checked>
                            show
                        </template>
                        <template #unchecked>
                            hide
                        </template>
                    </n-switch>
                </n-space>
                <n-collapse-transition :show="defaultedOutDailyPreferencesShow">
                    <n-data-table :columns="dailyPreferencesColumns" :data="defaultedOutDailyPreferences" :pagination="defaultedOutDailyPreferencesPagination" />
                </n-collapse-transition>
            </n-space>
        </n-space>

        <n-modal v-model:show="showPreferenceModal.show" :on-after-leave="onClosePreferenceModal" class="preference-modal">
            <n-card header-class="preference-modal-header">
                <template #header>
                    {{ date.toFormat('EEEE, MMM d') }} Preference Update
                </template>
                <n-grid :x-gap="12" :y-gap="12" :cols="4">
                    <n-gi :span="1">
                        <h4 class="preference-modal-label" align-text="right">Household:</h4>
                    </n-gi>
                    <n-gi :span="3">
                        <n-text>{{ showPreferenceModal.headOfHouseholdName }}</n-text>
                    </n-gi>
                    <n-gi :span="1">
                        <h4 class="preference-modal-label" align-text="right">Zone:</h4>
                    </n-gi>
                    <n-gi :span="3">
                        <n-text>{{ showPreferenceModal.zoneName }}</n-text>
                    </n-gi>
                    <n-gi :span="1">
                        <h4 class="preference-modal-label" align-text="right">Phone:</h4>
                    </n-gi>
                    <n-gi :span="3">
                        <n-text>{{ showPreferenceModal.thaaliContactPhone }} ({{ showPreferenceModal.thaaliContactName }})</n-text>
                    </n-gi>
                    <n-gi :span="1">
                        <h4 class="preference-modal-label" align-text="right">Size:</h4>
                    </n-gi>
                    <n-gi :span="3">
                        <n-radio :checked="showPreferenceModal.thaaliSize === 'X'" @click="onThaaliSizeChange('X')">X</n-radio>
                        <n-radio :checked="showPreferenceModal.thaaliSize === 'A'" @click="onThaaliSizeChange('A')">A</n-radio>
                        <n-radio :checked="showPreferenceModal.thaaliSize === 'B'" @click="onThaaliSizeChange('B')">B</n-radio>
                        <n-radio :checked="showPreferenceModal.thaaliSize === 'C'" @click="onThaaliSizeChange('C')">C</n-radio>
                        <n-radio :checked="showPreferenceModal.thaaliSize === 'D'" @click="onThaaliSizeChange('D')">D</n-radio>
                    </n-gi>
                    <n-gi :span="1">
                        <h4 class="preference-modal-label" align-text="right">Mehman Thaali:</h4>
                    </n-gi>
                    <n-gi :span="3">
                        <n-checkbox v-model:checked="showPreferenceModal.mehmanThaali" @click="onMehmanThaaliChange(showPreferenceModal.mehmanThaali)" />
                    </n-gi>
                    <n-gi :span="1">
                        <h4 class="preference-modal-label" align-text="right">Mehman Thaali Size:</h4>
                    </n-gi>
                    <n-gi :span="3">
                        <n-radio :checked="showPreferenceModal.mehmanThaaliSize.includes('X')" @click="onMehmanThaaliSizeChange('X')">X</n-radio>
                        <n-radio :checked="showPreferenceModal.mehmanThaaliSize.includes('A')" @click="onMehmanThaaliSizeChange('A')">A</n-radio>
                        <n-radio :checked="showPreferenceModal.mehmanThaaliSize.includes('B')" @click="onMehmanThaaliSizeChange('B')">B</n-radio>
                        <n-radio :checked="showPreferenceModal.mehmanThaaliSize.includes('C')" @click="onMehmanThaaliSizeChange('C')">C</n-radio>
                        <n-radio :checked="showPreferenceModal.mehmanThaaliSize.includes('D')" @click="onMehmanThaaliSizeChange('D')">D</n-radio>
                    </n-gi>
                    <n-gi :span="1">
                        <h4 class="preference-modal-label" align-text="right">Notes:</h4>
                    </n-gi>
                    <n-gi :span="3">
                        <n-text>{{ showPreferenceModal.notes }}</n-text>
                    </n-gi>
                    <n-gi :span="1">
                        <h4 class="preference-modal-label" align-text="right">Status:</h4>
                    </n-gi>
                    <n-gi :span="3">
                        <n-select v-model:value="showPreferenceModal.status" :options="statusOptions" style="width: 250px;" />
                    </n-gi>
                    <n-gi :span="1">
                        <n-button v-bind:disabled="showPreferenceModal.loading" type="primary" @click="onUpdatePreference">Update</n-button>
                    </n-gi>
                </n-grid>
            </n-card>
        </n-modal>
    </div>
</template>

<script setup>
import { Calendar } from '@vicons/ionicons5'
import { DateTime } from 'luxon'
import { NButton, useMessage } from 'naive-ui'
import { computed, h, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { apiUrl } from '@/utils/helpers'

import CountSummaryCard from '@/components/organisms/CountSummaryCard.vue'
import MenuList from '@/components/organisms/MenuList.vue'

const route = useRoute();
const day = route.params.day.charAt(0).toUpperCase() + route.params.day.slice(1);
let date;

const message = useMessage();

// DAILY PREFERENCES TABLE CONFIGURATION
const dataTableRef = ref(null);

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
        width: 30,
        sorter: (rowA, rowB) => {
            const a = parseInt(rowA.thaaliContainerNumber, 10);
            const b = parseInt(rowB.thaaliContainerNumber, 10);
            const aNaN = isNaN(a);
            const bNaN = isNaN(b);
            if (aNaN && bNaN) return 0;
            if (aNaN) return 1;
            if (bNaN) return -1;
            return a - b;
        }
    },
    {
        key: 'size',
        title: 'Size',
        className: 'size',
        width: 30,
        sorter: (rowA, rowB) => {
            const order = { A: 1, B: 2, C: 3, D: 4 };
            const a = order[rowA.size] || 99;
            const b = order[rowB.size] || 99;
            return a - b;
        },
        filter(value, row) {
            return ~row.size.indexOf(value);
        },
    },
    {
        key: 'zoneName',
        title: 'Zone',
        width: 50,
        ellipsis: {
            tooltip: true
        },
        sorter: (rowA, rowB) => {
            const a = rowA.zoneName ? rowA.zoneName.toLowerCase() : '';
            const b = rowB.zoneName ? rowB.zoneName.toLowerCase() : '';
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        },
        filter(value, row) {
            return ~row.zoneName.indexOf(value);
        },
    },
    {
        key: 'headOfHouseholdName',
        title: 'Household',
        width: 100,
        ellipsis: {
            tooltip: true
        },
        sorter: (rowA, rowB) => {
            const a = rowA.headOfHouseholdName ? rowA.headOfHouseholdName.toLowerCase() : '';
            const b = rowB.headOfHouseholdName ? rowB.headOfHouseholdName.toLowerCase() : '';
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        }
    },
    {
        key: 'status',
        title: 'Status',
        className: 'status',
        width: 50,
        sorter: (rowA, rowB) => {
            const a = rowA.status ? rowA.status.toLowerCase() : '';
            const b = rowB.status ? rowB.status.toLowerCase() : '';
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        }
    },
    {
        key: 'edit',
        title: '',
        width: 25,
        render: (row) => {
            if (row.mehmanThaali) return null;
            return h(NButton, {
                size: 'small',
                text: true,
                onClick: () => {
                    onOpenPreferenceModal(row);
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

const currentFilter = ref('none');
const filter = (type, value) => {
    if (type === 'none') {
        dataTableRef.value.filter(null);
        currentFilter.value = 'none';
    }
    if (type === 'size') {
        currentFilter.value = 'size';
        dataTableRef.value.filter({
            size: [value],
        });
    }
    if (type === 'zone') {
        currentFilter.value = 'zone';
        dataTableRef.value.filter({
            zoneName: [value],
        });
    }
}

const downloadCSV = () => dataTableRef.value?.downloadCsv({
    fileName: `${day}-${date.toFormat('yyyyLLdd')}.csv`,
    keepOriginalData: true,
});

// MODAL CONFIGURATION
const statusOptions = [
    {
        label: 'Unknown',
        value: 'UNKNOWN'
    },
    {
        label: 'Available',
        value: 'AVAILABLE'
    },
    {
        label: 'Missing',
        value: 'MISSING'
    },
    {
        label: 'Filled',
        value: 'FILLED'
    },
    {
        label: 'Picked Up',
        value: 'PICKED_UP'
    }
];

const onOpenPreferenceModal = (row) => {
    showPreferenceModal.value.show = true;
    showPreferenceModal.value.loading = false;
    showPreferenceModal.value.date = date;
    showPreferenceModal.value.weeklyMenuId = menuData.value.weekId;
    showPreferenceModal.value.fillScheduleId = menuData.value.fillScheduleId;
    showPreferenceModal.value.dailyMenuId = menuData.value.menuId;
    showPreferenceModal.value.fmbProfileId = row.fmbProfileId;
    showPreferenceModal.value.headOfHouseholdName = row.headOfHouseholdName;
    showPreferenceModal.value.zoneName = row.zoneName;
    showPreferenceModal.value.thaaliContactName = row.thaaliContactName;
    showPreferenceModal.value.thaaliContactPhone = row.thaaliContactPhone;
    showPreferenceModal.value.thaaliContactVerified = row.thaaliContactVerified;
    showPreferenceModal.value.householdFillMenuPreferenceId = row.householdFillMenuPreferenceId;
    showPreferenceModal.value.isOptedIn = row.isOptedIn;
    showPreferenceModal.value.thaaliSize = row.size;
    showPreferenceModal.value.mehmanThaali = row.householdFillMenuPreferenceId != 0 ? menuData.value.dailyPreferences.find(item => item.householdFillMenuPreferenceId === row.householdFillMenuPreferenceId && item.mehmanThaali)?.mehmanThaali ? true : false : false;
    showPreferenceModal.value.mehmanThaaliSize = row.householdFillMenuPreferenceId != 0 ? menuData.value.dailyPreferences.find(item => item.householdFillMenuPreferenceId === row.householdFillMenuPreferenceId && item.mehmanThaali)?.size ?? 'X' : 'X';
    showPreferenceModal.value.notes = row.notes;
    showPreferenceModal.value.status = row.status;
    showPreferenceModal.value.changeuseritsid = 'admin';
}

const onClosePreferenceModal = () => {
    showPreferenceModal.value.show = false;
    showPreferenceModal.value.loading = false;
    showPreferenceModal.value.weeklyMenuId = 0;
    showPreferenceModal.value.fillScheduleId = 0;
    showPreferenceModal.value.dailyMenuId = 0;
    showPreferenceModal.value.fmbProfileId = 0;
    showPreferenceModal.value.headOfHouseholdName = '';
    showPreferenceModal.value.zoneName = '';
    showPreferenceModal.value.thaaliContactName = '';
    showPreferenceModal.value.thaaliContactPhone = '';
    showPreferenceModal.value.thaaliContactVerified = false;
    showPreferenceModal.value.householdFillMenuPreferenceId = 0;
    showPreferenceModal.value.isOptedIn = false;
    showPreferenceModal.value.thaaliSize = 'X';
    showPreferenceModal.value.mehmanThaali = false;
    showPreferenceModal.value.mehmanThaaliSize = 'X';
    showPreferenceModal.value.notes = '';
    showPreferenceModal.value.status = 'UNKNOWN';
}

const onThaaliSizeChange = (size) => {
    showPreferenceModal.value.thaaliSize = size;
    showPreferenceModal.value.isOptedIn = true;

    if (size.includes('X')) {
        showPreferenceModal.value.isOptedIn = false;
        showPreferenceModal.value.mehmanThaali = false;
        showPreferenceModal.value.mehmanThaaliSize = 'X';
    }
}

const onMehmanThaaliChange = (mehmanThaali) => {
    showPreferenceModal.value.mehmanThaali = mehmanThaali;
    if (mehmanThaali === false) {
        showPreferenceModal.value.mehmanThaaliSize = 'X';
    }
    if (mehmanThaali === true) {
        showPreferenceModal.value.mehmanThaaliSize = showPreferenceModal.value.thaaliSize;
    }
}

const onMehmanThaaliSizeChange = (size) => {
    showPreferenceModal.value.mehmanThaaliSize = size;
    if (size.includes('X')) {
        showPreferenceModal.value.mehmanThaali = false;
    } else {
        showPreferenceModal.value.mehmanThaali = true;
    }
}

const onUpdatePreference = async () => {
    showPreferenceModal.value.loading = true;
    const inputBody = {
        weeklyMenuId: showPreferenceModal.value.weeklyMenuId,
        fillScheduleId: showPreferenceModal.value.fillScheduleId,
        dailyMenuId: showPreferenceModal.value.dailyMenuId,
        fmbProfileId: showPreferenceModal.value.fmbProfileId,
        householdPreferenceId: showPreferenceModal.value.householdFillMenuPreferenceId,
        isOptedIn: showPreferenceModal.value.isOptedIn,
        thaaliSize: showPreferenceModal.value.thaaliSize,
        mehmanThaali: showPreferenceModal.value.mehmanThaali,
        mehmanThaaliSize: showPreferenceModal.value.mehmanThaaliSize,
        notes: showPreferenceModal.value.notes,
        status: showPreferenceModal.value.status,
        changeuseritsid: 'test-admin-site',
    }

    const response = await fetch(`${apiUrl}/api/v2/admin/preference`, {
        method: 'POST',
        body: JSON.stringify(inputBody),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (response.status === 200) {
        message.success('Preference updated successfully');
        await getMenuData();
    } else {
        message.error(`Failed to update preference: ${data.message}`);
    }
    showPreferenceModal.value.loading = false;
}

// DATA REFERENCES

const dailyPreferencesPagination = ref({
    pageSize: 10,
});

const optedOutDailyPreferencesPagination = ref({
    pageSize: 10,
});

const defaultedOutDailyPreferencesPagination = ref({
    pageSize: 10,
});

const defaultedOutDailyPreferencesShow = ref(false);

const showPreferenceModal = ref({
    show: false,
    loading: false,
    weeklyMenuId: 0,
    fillScheduleId: 0,
    dailyMenuId: 0,
    fmbProfileId: 0,
    headOfHouseholdName: '',
    zoneName: '',
    thaaliContactName: '',
    thaaliContactPhone: '',
    thaaliContactVerified: false,
    householdFillMenuPreferenceId: 0,
    isOptedIn: false,   
    thaaliSize: 'X',
    mehmanThaali: false,
    mehmanThaaliSize: 'X',
    notes: '',
    status: 'UNKNOWN',
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
    return menuData.value.dailyPreferences.filter(item => item.isOptedIn && item.defaultIsOptedIn).sort((a, b) => a.thaaliContainerNumber - b.thaaliContainerNumber);
});

const optedOutDailyPreferences = computed(() => {
    return menuData.value.dailyPreferences.filter(item => !item.isOptedIn && item.defaultIsOptedIn).sort((a, b) => a.thaaliContainerNumber - b.thaaliContainerNumber);
});

const defaultedOutDailyPreferences = computed(() => {
    return menuData.value.dailyPreferences.filter(item => !item.defaultIsOptedIn).sort((a, b) => a.thaaliContainerNumber - b.thaaliContainerNumber);
});

const pastCutoffOrDate = computed(() => {
    const menuDate = DateTime.fromISO(menuData.value.menuDate).setZone('America/New_York');
    const cutoff = DateTime.fromISO(menuData.value.cutoffDateAndTime).setZone('America/New_York');
    const now = DateTime.now().setZone('America/New_York');
    return cutoff < now.minus({ hours: 5 }) || menuDate < now.minus({ hours: 5 });
});

const zoneList = computed(() => {
    return menuData.value.dailyPreferences.map(item => item.zoneName).filter((item, index, self) => self.indexOf(item) === index).sort();
});

// API CALLS

const getMenuData = async () => {
    const response = await fetch(`${apiUrl}/api/v2/admin/week/${route.params.startDate}/${day}`);
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
}

onMounted(async () => {
    await getMenuData();
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

.count-summary-container {
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

.preference-modal {
    width: 50%;
}

.preference-modal-label {
    font-weight: bold;
    text-align: right;
}
</style>