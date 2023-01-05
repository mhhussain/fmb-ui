import axios from "axios";
import { JamaatMember, schema as jamaatMemberSchema } from '@/api/models/JamaatMember';
import { Household, schema as householdSchema } from '@/api/models/Household';
import { HouseholdFaizUlMawaidProfile, schema as householdFaizUlMawaidProfileSchema } from '@/api/models/HouseholdFaizUlMawaidProfile';

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
}

export {
  getJamaatMemberByITSId,
  getHouseholdById,
  getFMBProfileByHouseholdId
};
