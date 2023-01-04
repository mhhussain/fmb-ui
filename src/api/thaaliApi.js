import axios from "axios";
import { JamaatMember, schema as jamaatMemberSchema } from '@/api/models/JamaatMember';
import { Household, schema as householdSchema } from '@/api/models/Household';

const API_ENDPOINT = `https://test-thaali-api.herokuapp.com/api/db`;

const getJamaatMemberByITSId = async (itsId) => {
  return new JamaatMember(await jamaatMemberSchema.validate((await axios.get(`${API_ENDPOINT}/JamaatMembers?ItsID=${itsId}`)).data[0]));
};

const getHouseholdById = async (householdId) => {
  return new Household(await householdSchema.validate((await axios.get(`${API_ENDPOINT}/Households?HouseholdID=${householdId}`)).data[0]));
};

export { getJamaatMemberByITSId, getHouseholdById };
