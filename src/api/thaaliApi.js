import axios from "axios";
import { JamaatMember, schema as jamaatMemberSchema } from '@/api/models/JamaatMember';
import { Household, schema as householdSchema } from '@/api/models/Household';
import { HouseholdFaizUlMawaidProfile, schema as householdFaizUlMawaidProfileSchema } from '@/api/models/HouseholdFaizUlMawaidProfile';
import { WeeklyMenu, schema as weeklyMenuSchema } from '@/api/models/WeeklyMenu';
import { FillSchedules, schema as fillSchedulesSchema } from '@/api/models/FillSchedules';
import { DailyMenu, schema as dailyMenuSchema } from '@/api/models/DailyMenu';
import { DailyMenuItem, schema as dailyMenuItemSchema } from '@/api/models/DailyMenuItem';

const API_ENDPOINT = `https://test-thaali-api.herokuapp.com/api/db`;

const getJamaatMemberByITSId = async (itsId) => {
  // Retrieve data
  const res = (await axios.get(`${API_ENDPOINT}/JamaatMembers?ItsID=${itsId}`)).data[0];
  // Validate response
  await jamaatMemberSchema.validate(res);
  // Return new mapped object
  return new JamaatMember(res);
};

const getHouseholdById = async (householdId) => {
  // Retrieve data
  const res = (await axios.get(`${API_ENDPOINT}/Households?HouseholdID=${householdId}`)).data[0];
  // Validate response
  await householdSchema.validate(res);
  // Return new mapped object
  return new Household(res);
};

const getFMBProfileByHouseholdId = async (householdId) => {
  // Retrieve data
  const res = (await axios.get(`${API_ENDPOINT}/HouseholdFaizUlMawaidProfiles?Household_HouseholdID=${householdId}`)).data[0];
  // Validate response
  await householdFaizUlMawaidProfileSchema.validate(res);
  // Return new mapped object
  return new HouseholdFaizUlMawaidProfile(res);
};

const getWeeks = async () => {
  // Retrieve data
  const res = (await axios.get(`${API_ENDPOINT}/WeeklyMenu`)).data;
  // Validate response
  res.forEach(async (v) => await weeklyMenuSchema.validate(v));
  // Return new mapped object
  return new WeeklyMenu(res);
};

const getFillSchedulesByWeeklyMenuId = async (menuId) => {
  // Retrieve data
  const res = (await axios.get(`${API_ENDPOINT}/FillSchedules?WeeklyMenu_WeeklyMenuID=${menuId}`)).data;
  // Validate response
  res.forEach(async (v) => await fillSchedulesSchema.validate(v));
  // Return new mapped object
  return new FillSchedules(res);
};

const getDailyMenusByFillScheduleId = async (fillingId) => {
  // Retrieve data
  const res = (await axios.get(`${API_ENDPOINT}/DailyMenus?FillSchedule_FillScheduleID=${fillingId}`)).data;
  // Validate response
  res.forEach(async (v) => await dailyMenuSchema.validate(v));
  // Return new mapped object
  return new DailyMenu(res);
};

const getDailyMenuItemsByDailyMenu = async (dailyMenuId) => {
  // Retrieve data
  const res = (await axios.get(`${API_ENDPOINT}/DailyMenuItems?DailyMenu_DailyMenuID=${dailyMenuId}`)).data;
  // Validate response
  res.forEach(async (v) => await dailyMenuItemSchema.validate(v));
  // Return new mapped object
  return new DailyMenuItem(res);
}

export {
  getJamaatMemberByITSId,
  getHouseholdById,
  getFMBProfileByHouseholdId,
  getWeeks,
  getFillSchedulesByWeeklyMenuId,
  getDailyMenusByFillScheduleId,
  getDailyMenuItemsByDailyMenu,
};
