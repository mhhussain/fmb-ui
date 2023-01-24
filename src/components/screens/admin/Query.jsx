import { useState } from "react";
import Header from "@/atoms/navigators/Header";
import AdminQuery from "@/organisms/admin-queryer";

import "@/styles/Home.css";

import {
  getJamaatMemberByITSId,
  getHouseholdById,
  getFMBProfileByHouseholdId,
  getWeeks,
  getFillSchedulesByWeeklyMenuId,
  getDailyMenusByFillScheduleId,
  getDailyMenuItemsByDailyMenu,
} from "@/api/thaaliApi";

export default function Query() {
  return (
    <div className="App">
      <Header />
      <h1>FMB DB Query Page</h1>
      <AdminQuery queryName="getJamaatMemberByITSId" req={getJamaatMemberByITSId} />
      <AdminQuery queryName="getHouseholdById" req={getHouseholdById} />
      <AdminQuery queryName="getFMBProfileByHouseholdId" req={getFMBProfileByHouseholdId} />
      <AdminQuery queryName="getWeeks" req={getWeeks} />
      <AdminQuery queryName="getFillSchedulesByWeeklyMenuId" req={getFillSchedulesByWeeklyMenuId} />
      <AdminQuery queryName="getDailyMenusByFillScheduleId" req={getDailyMenusByFillScheduleId} />
      <AdminQuery queryName="getDailyMenuItemsByDailyMenu" req={getDailyMenuItemsByDailyMenu} />
    </div>
  );
}
