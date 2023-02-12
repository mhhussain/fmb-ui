class MumineenViewModel {
  constructor(obj) {
    this.JamaatMemberID = obj.JamaatMemberID;
    this.ItsID = obj.ItsID;
    this.FirstName = obj.FirstName;
    this.LastName = obj.LastName;
    this.CellPhone = obj.CellPhone;
    this.WorkPhone = obj.WorkPhone;
    this.Email = obj.Email;
    this.Title = obj.Title;

    // TODO:
    // Figure out how to represent retrieve and represent relationships to HoH
    // this.RelationshipToHeadOfHousehold_RelationshipTypeID = obj.RelationshipToHeadOfHousehold_RelationshipTypeID;
  };
};

export { MumineenViewModel };
