export const sampleWeekData = (weekStart) => ({
    weekStart: weekStart,
    cutoffDate: weekStart,
    stats: {},
    monday: {
        name: 'Monday',
        date: weekStart.plus({ days: 0 }),
        stats: {
            totalThaalis: 0,
            totalPreferenceUpdates: 0,
            totalOptOuts: 0,
            totalASizeThaalis: 0,
            totalBSizeThaalis: 0,
            totalCSizeThaalis: 0,
            totalDSizeThaalis: 0,
            totalMehmanThaalis: 0,
        },
        menu: [
            {
                description: 'Daal Gosht',
            },
            {
                description: 'Roti',
            },
        ],
    },
    tuesday: {
        name: 'Tuesday',
        date: weekStart.plus({ days: 1 }),
        stats: {
            totalThaalis: 0,
            totalPreferenceUpdates: 0,
            totalOptOuts: 0,
            totalASizeThaalis: 0,
            totalBSizeThaalis: 0,
            totalCSizeThaalis: 0,
            totalDSizeThaalis: 0,
            totalMehmanThaalis: 0,
        },
        menu: [
            {
                description: 'Daal Gosht',
            },
            {
                description: 'Roti',
            },
        ],
    },
    wednesday: {
        name: 'Wednesday',
        date: weekStart.plus({ days: 2 }),
        stats: {
            totalThaalis: 0,
            totalPreferenceUpdates: 0,
            totalOptOuts: 0,
            totalASizeThaalis: 0,
            totalBSizeThaalis: 0,
            totalCSizeThaalis: 0,
            totalDSizeThaalis: 0,
            totalMehmanThaalis: 0,
        },
        menu: [
            {
                description: 'Daal Gosht',
            },
            {
                description: 'Roti',
            },
        ],
    },
    thursday: {
        name: 'Thursday',
        date: weekStart.plus({ days: 3 }),
        stats: {
            totalThaalis: 0,
            totalPreferenceUpdates: 0,
            totalOptOuts: 0,
            totalASizeThaalis: 0,
            totalBSizeThaalis: 0,
            totalCSizeThaalis: 0,
            totalDSizeThaalis: 0,
            totalMehmanThaalis: 0,
        },
        menu: [
            {
                description: 'Daal Gosht',
            },
            {
                description: 'Roti',
            },
        ],
    },
    friday: {},
    saturday: {
        name: 'Saturday',
        date: weekStart.plus({ days: 5 }),
        stats: {
            totalThaalis: 0,
            totalPreferenceUpdates: 0,
            totalOptOuts: 0,
            totalASizeThaalis: 0,
            totalBSizeThaalis: 0,
            totalCSizeThaalis: 0,
            totalDSizeThaalis: 0,
            totalMehmanThaalis: 0,
        },
        menu: [
            {
                description: 'Daal Gosht',
            },
            {
                description: 'Roti',
            },
        ],
    },
});
