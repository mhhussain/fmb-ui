class HouseholdViewModel {
  constructor(obj) {
    this.info = {
        HouseholdID: obj.info.HouseholdID,
        HomePhone: obj.info.HomePhone,
        StreetAddress1: obj.info.StreetAddress1,
        StreetAddress2: obj.info.StreetAddress2,
        City: obj.info.City,
        State: obj.info.State,
        PostalCode: obj.info.PostalCode,
    };
    this.fmbProfile = {
        HouseholdFaizUlMawaidProfileID: obj.fmbProfile.HouseholdFaizUlMawaidProfileID,
        Notes: obj.fmbProfile.Notes,
        PrimaryThaaliContact: obj.fmbProfile.PrimaryThaaliContact,
        SecondaryThaaliContact: obj.fmbProfile.SecondaryThaaliContact,
        ThaaliZone: obj.fmbProfile.ThaaliZone,
    };
    this.members = obj.members;
    this.container = obj.container;
    this.headOfHousehold = obj.headOfHousehold;
  };
};

export { HouseholdViewModel };
