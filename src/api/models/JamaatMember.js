import { object, string, number } from 'yup';
import { Audit } from '@/models/Audit';

const schema = object({
  JamaatMemberID: number().required(),
  ItsID: string().required(),
  FirstName: string().nullable(),
  LastName: string().nullable(),
  CellPhone: string().nullable(),
  WorkPhone: string().nullable(),
  Email: string().nullable(),
  Title: string().nullable(),
  Household_HouseholdID: number(),
  RelationshipToHeadOfHousehold_RelationshipTypeID: number(),
  UserRole_UserRoleID: number(),
});

class JamaatMember extends Audit {
  constructor(apiobj) {
    super(apiobj);
    this.JamaatMemberID = apiobj.JamaatMemberID;
    this.ItsID = apiobj.ItsID;
    this.FirstName = apiobj.FirstName;
    this.LastName = apiobj.LastName;
    this.CellPhone = apiobj.CellPhone;
    this.WorkPhone = apiobj.WorkPhone;
    this.Email = apiobj.Email;
    this.Title = apiobj.Title;
    this.Household_HouseholdID = apiobj.Household_HouseholdID;
    this.RelationshipToHeadOfHousehold_RelationshipTypeID =
      apiobj.RelationshipToHeadOfHousehold_RelationshipTypeID;
    this.UserRole_UserRoleID = apiobj.UserRole_UserRoleID;
    this.CreatedOn = apiobj.CreatedOn;
    this.CreatedByName = apiobj.CreatedByName;
    this.UpdatedOn = apiobj.UpdatedOn;
    this.UpdatedByName = apiobj.UpdatedByName;
  }
}

export { schema, JamaatMember };
