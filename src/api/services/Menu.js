import {
    getWeeks,
    getFillSchedulesByWeeklyMenuId,
    getDailyMenusByFillScheduleId,
    getDailyMenuItemsByDailyMenu,
} from "@/api/thaaliApi";

import { DateTime, Interval } from "luxon";

import { MenuViewModel } from "@/api/models/viewmodels/MenuViewModel";

const getWeeklyMenus = async (date) => {
    const week = (await getWeeks()).find(w => Interval.fromDateTimes(DateTime.fromISO(w.WeekStart).startOf('week'), DateTime.fromISO(w.WeekStart).endOf('week')).contains(date));

    // If no menus for the week, return empty array
    if (!week || week.length < 1) return [];

    const fillSchedules = await getFillSchedulesByWeeklyMenuId(week.WeeklyMenuID);
    let menus = [];
    for(let i = 0; i < fillSchedules.length; i++) {
        const a = await getDailyMenusByFillScheduleId(fillSchedules[i].FillScheduleID);
        menus = menus.concat(a);
    }

    let dataArray = [];
    for(let i = 0; i < menus.length; i++) {
        const dataObj = {
            DailyMenuID: menus[i].DailyMenuID,
            fillDate: DateTime.fromISO(await fillSchedules.find(v => v.FillScheduleID === menus[i].FillSchedule_FillScheduleID).FillingDate),
            date: DateTime.fromISO(menus[i].Date),
            items: (await getDailyMenuItemsByDailyMenu(menus[i].DailyMenuID)).map(v => v.Description)
        };

        dataArray.push(dataObj);
    };

    return await dataArray.map(dataObj => new MenuViewModel(dataObj));
};

export { getWeeklyMenus };