import {
    getJamaatMemberById,
    getJamaatMemberByITSId,
    getJamaatMembersByHouseholdId,
    getHouseholdById,
    getFMBProfileByHouseholdId,
} from "@/api/thaaliApi";

import { MumineenViewModel } from "@/api/models/viewmodels/MumineenViewModel";
import { HouseholdViewModel } from "@/api/models/viewmodels/HouseholdViewModel";

const householdByMumineen = async (mumineen) => {
    const jamaatMember = await getJamaatMemberByITSId(mumineen.ItsID);
    const household = await getHouseholdById(jamaatMember.Household_HouseholdID);
    const members = await getJamaatMembersByHouseholdId(household.HouseholdID);
    const fmbProfile = await getFMBProfileByHouseholdId(jamaatMember.Household_HouseholdID);
    const headOfHousehold = await getJamaatMemberById(household.HeadOfHousehold_JamaatMemberID);
    const PrimaryThaaliContact = await getJamaatMemberById(fmbProfile.PrimaryThaaliContact_JamaatMemberID);
    const SecondaryThaaliContact = await getJamaatMemberById(fmbProfile.SecondaryThaaliContact_JamaatMemberID);

    const dataObj = {
        info: {
            HouseholdID: household.HouseholdID,
            HomePhone: household.HomePhone,
            StreetAddress1: household.StreetAddress1,
            StreetAddress2: household.StreetAddress2,
            City: household.City,
            State: household.State,
            PostalCode: household.PostalCode,
        },
        fmbProfile: {
            HouseholdFaizUlMawaidProfileID: fmbProfile.HouseholdFaizUlMawaidProfileID,
            Notes: fmbProfile.Notes,
            PrimaryThaaliContact: new MumineenViewModel(PrimaryThaaliContact),
            SecondaryThaaliContact: new MumineenViewModel(SecondaryThaaliContact),

            // TODO:
            // Figure out how to incorporate thaali zones into view models
            // ThaaliZone: fmbProfile.ThaaliZone,
        },
        members: members.map(v => new MumineenViewModel(v)),
        container: {},
        headOfHousehold: new MumineenViewModel(headOfHousehold),
    }

    return new HouseholdViewModel(dataObj);
};

export { householdByMumineen };