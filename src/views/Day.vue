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
                <h3 style="font-weight: bold;">Daily Preferences ({{ dailyPreferences.length }})</h3>
                <n-alert v-if="!pastCutoffOrDate" type="warning">Thaali cutoff has not been reached for this day, menu preferences are not final.</n-alert>
                <n-space horizontal>
                    <n-text>Group by:</n-text>
                    <n-button info ghost round>None</n-button>
                    <n-button info ghost round>Size</n-button>
                    <n-button info ghost round>Zone</n-button>
                    <n-button info ghost round>Status</n-button>
                </n-space>
                <n-data-table :columns="dailyPreferencesColumns" :data="dailyPreferences" :row-class-name="rowClass" :pagination="dailyPreferencesPagination" />
                
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
            <n-card :title="`${day} Preference Update`">
                <n-space vertical>
                    <n-space horizontal>
                        <n-text>Household:</n-text>
                        <n-text>{{ showPreferenceModal.headOfHouseholdName }}</n-text>
                    </n-space>
                    <n-space horizontal>
                        <n-text>Zone:</n-text>
                        <n-text>{{ showPreferenceModal.zoneName }}</n-text>
                    </n-space>
                    <n-space horizontal>
                        <n-text>Phone:</n-text>
                        <n-text>{{ showPreferenceModal.thaaliContactPhone }} ({{ showPreferenceModal.thaaliContactName }})</n-text>
                    </n-space>
                    <n-space horizontal>
                        <n-text>Size:</n-text>
                        <n-radio :checked="showPreferenceModal.thaaliSize === 'X'" @click="onThaaliSizeChange('X')">X</n-radio>
                        <n-radio :checked="showPreferenceModal.thaaliSize === 'A'" @click="onThaaliSizeChange('A')">A</n-radio>
                        <n-radio :checked="showPreferenceModal.thaaliSize === 'B'" @click="onThaaliSizeChange('B')">B</n-radio>
                        <n-radio :checked="showPreferenceModal.thaaliSize === 'C'" @click="onThaaliSizeChange('C')">C</n-radio>
                        <n-radio :checked="showPreferenceModal.thaaliSize === 'D'" @click="onThaaliSizeChange('D')">D</n-radio>
                    </n-space>
                    <n-space horizontal>
                        <n-text>Mehman Thaali:</n-text>
                        <n-checkbox v-model:checked="showPreferenceModal.mehmanThaali" @click="onMehmanThaaliChange(showPreferenceModal.mehmanThaali)">
                        </n-checkbox>
                    </n-space>
                    <n-space horizontal>
                        <n-text>Mehman Thaali Size:</n-text>
                        <n-radio :checked="showPreferenceModal.mehmanThaaliSize.includes('X')" @click="onMehmanThaaliSizeChange('X')">X</n-radio>
                        <n-radio :checked="showPreferenceModal.mehmanThaaliSize.includes('A')" @click="onMehmanThaaliSizeChange('A')">A</n-radio>
                        <n-radio :checked="showPreferenceModal.mehmanThaaliSize.includes('B')" @click="onMehmanThaaliSizeChange('B')">B</n-radio>
                        <n-radio :checked="showPreferenceModal.mehmanThaaliSize.includes('C')" @click="onMehmanThaaliSizeChange('C')">C</n-radio>
                        <n-radio :checked="showPreferenceModal.mehmanThaaliSize.includes('D')" @click="onMehmanThaaliSizeChange('D')">D</n-radio>
                    </n-space>
                    <n-space horizontal>
                        <n-text>Notes:</n-text>
                        <n-input v-model:value="showPreferenceModal.notes" />
                    </n-space>
                    <n-space horizontal>
                        <n-text>Status:</n-text>
                        <n-select v-model:value="showPreferenceModal.status" :options="statusOptions" />
                    </n-space>
                    <n-space horizontal>
                        <n-button type="primary">Update</n-button>
                    </n-space>
                </n-space>
            </n-card>
        </n-modal>
    </div>
</template>

<script setup>
import { h, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { DateTime } from 'luxon'
import { Calendar } from '@vicons/ionicons5'
import { NButton } from 'naive-ui'

import { apiUrl } from '@/utils/helpers'

import MenuListItem from '@/components/atoms/MenuListItem.vue'

const route = useRoute();
const day = route.params.day.charAt(0).toUpperCase() + route.params.day.slice(1);
let date;


// DAILY PREFERENCES TABLE CONFIGURATION
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
        key: 'headOfHouseholdName',
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
    showPreferenceModal.value.weeklyMenuId = menuData.value.weekId;
    showPreferenceModal.value.fillScheduleId = menuData.value.fillScheduleId;
    showPreferenceModal.value.dailyMenuId = menuData.value.menuId;
    showPreferenceModal.value.fmbProfileId = row.fmbProfileId;
    showPreferenceModal.value.headOfHouseholdName = row.headOfHouseholdName;
    showPreferenceModal.value.zoneName = row.zoneName;
    showPreferenceModal.value.thaaliContactName = row.thaaliContactName;
    showPreferenceModal.value.thaaliContactPhone = row.thaaliContactPhone;
    showPreferenceModal.value.thaaliContactVerified = row.thaaliContactVerified;
    showPreferenceModal.value.householdPreferenceId = row.householdPreferenceId;
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
    showPreferenceModal.value.weeklyMenuId = 0;
    showPreferenceModal.value.fillScheduleId = 0;
    showPreferenceModal.value.dailyMenuId = 0;
    showPreferenceModal.value.fmbProfileId = 0;
    showPreferenceModal.value.headOfHouseholdName = '';
    showPreferenceModal.value.zoneName = '';
    showPreferenceModal.value.thaaliContactName = '';
    showPreferenceModal.value.thaaliContactPhone = '';
    showPreferenceModal.value.thaaliContactVerified = false;
    showPreferenceModal.value.householdPreferenceId = 0;
    showPreferenceModal.value.isOptedIn = false;
    showPreferenceModal.value.thaaliSize = 'X';
    showPreferenceModal.value.mehmanThaali = false;
    showPreferenceModal.value.mehmanThaaliSize = 'X';
    showPreferenceModal.value.notes = '';
    showPreferenceModal.value.status = 'UNKNOWN';
}

const onThaaliSizeChange = (size) => {
    showPreferenceModal.value.thaaliSize = size;

    if (size.includes('X')) {
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
    weeklyMenuId: 0,
    fillScheduleId: 0,
    dailyMenuId: 0,
    fmbProfileId: 0,
    headOfHouseholdName: '',
    zoneName: '',
    thaaliContactName: '',
    thaaliContactPhone: '',
    thaaliContactVerified: false,
    householdPreferenceId: 0,
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

onMounted(async () => {
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

.preference-modal {
    width: 50%;
}
</style>