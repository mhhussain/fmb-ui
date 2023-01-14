import axios from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  JamaatMember,
  schema as jamaatMemberSchema,
} from "@/api/models/JamaatMember";
import { Household, schema as householdSchema } from "@/api/models/Household";
import {
  HouseholdFaizUlMawaidProfile,
  schema as householdFaizUlMawaidProfileSchema,
} from "@/api/models/HouseholdFaizUlMawaidProfile";

const API_ENDPOINT = `https://test-thaali-api.herokuapp.com/api/db`;

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return result;
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: API_ENDPOINT,
  }),
  endpoints: builder => ({
    getJamaatMemberByITSId: builder.query({
      query: itsId => ({
        url: `/JamaatMembers?ItsID=${itsId}`,
        method: "get",
        returnModel: JamaatMember,
      }),
    }),
    loginJamaatMemberByITSId: builder.mutation({
      query: itsId => ({
        url: `/JamaatMembers?ItsID=${itsId}`,
        method: "get",
        returnModel: JamaatMember,
      }),
    }),
  }),
});

const getJamaatMemberByITSId = async (itsId) => {
  // Retrieve data
  const res = (await axios.get(`${API_ENDPOINT}/JamaatMembers?ItsID=${itsId}`))
    .data[0];
  // Validate response
  await jamaatMemberSchema.validate(res);
  // Return new mapped object
  return new JamaatMember(res);
};

const getHouseholdById = async (householdId) => {
  // Retrieve data
  const res = (
    await axios.get(`${API_ENDPOINT}/Households?HouseholdID=${householdId}`)
  ).data[0];
  // Validate response
  await householdSchema.validate(res);
  // Return new mapped object
  return new Household(res);
};

const getFMBProfileByHouseholdId = async (householdId) => {
  // Retrieve data
  const res = (
    await axios.get(
      `${API_ENDPOINT}/HouseholdFaizUlMawaidProfiles?Household_HouseholdID=${householdId}`
    )
  ).data[0];
  // Validate response
  await householdFaizUlMawaidProfileSchema.validate(res);
  // Return new mapped object
  return new HouseholdFaizUlMawaidProfile(res);
};

export const { useGetJamaatMemberByITSIdQuery, useLoginJamaatMemberByITSIdMutation } = api;
