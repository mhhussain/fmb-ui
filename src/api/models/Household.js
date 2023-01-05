import { object, string, number } from 'yup';
import { Audit } from '@/models/Audit';

const schema = object({
  HouseholdID: number().required(),
  HomePhone: string().nullable(),
  StreetAddress1: string().nullable(),
  StreetAddress2: string().nullable(),
  City: string().nullable(),
  PostalCode: string().nullable(),
  HeadOfHousehold_JamaatMemberID: number().nullable()
});

class Household extends Audit {
  constructor(apiobj) {
    super(apiobj);
    this.HouseholdID = apiobj.HouseholdID;
    this.HomePhone = apiobj.HomePhone;
    this.StreetAddress1 = apiobj.StreetAddress1;
    this.StreetAddress2 = apiobj.StreetAddress2;
    this.City = apiobj.City;
    this.State = apiobj.State;
    this.PostalCode = apiobj.PostalCode;
    this.HeadOfHousehold_JamaatMemberID = apiobj.HeadOfHousehold_JamaatMemberID;
    this.CreatedOn = apiobj.CreatedOn;
    this.CreatedByName = apiobj.CreatedByName;
    this.UpdatedOn = apiobj.UpdatedOn;
    this.UpdatedByName = apiobj.UpdatedByName;
  };
};

export { schema, Household };
