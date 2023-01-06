import { object, string, number } from 'yup';
import { Audit } from '@/models/Audit';

const schema = object({
  HouseholdFaizUlMawaidProfileID: string().required(),
  Notes: string().nullable(),
  Household_HouseholdID: number().required(),
  PrimaryThaaliContact_JamaatMemberID: number().nullable(),
  SecondaryThaaliContact_JamaatMemberID: number().nullable(),
  ThaaliZone_ThaaliZoneID: number().nullable(),
});

class HouseholdFaizUlMawaidProfile extends Audit {
  constructor(apiobj) {
    super(apiobj);
    this.HouseholdFaizUlMawaidProfileID = apiobj.HouseholdFaizUlMawaidProfileID;
    this.Notes = apiobj.Notes;
    this.Household_HouseholdID = apiobj.Household_HouseholdID;
    this.PrimaryThaaliContact_JamaatMemberID = apiobj.PrimaryThaaliContact_JamaatMemberID;
    this.SecondaryThaaliContact_JamaatMemberID = apiobj.SecondaryThaaliContact_JamaatMemberID;
    this.ThaaliZone_ThaaliZoneID = apiobj.ThaaliZone_ThaaliZoneID;
  };
};

export { schema, HouseholdFaizUlMawaidProfile };
