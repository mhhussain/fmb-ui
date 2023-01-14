import { object, string } from 'yup';

const schema = object({
  CreatedOn: string().nullable(),
  CreatedByName: string().nullable(),
  UpdatedOn: string().nullable(),
  UpdatedByName: string().nullable(),
});

class Audit {
  constructor(apiobj) {
    this.CreatedOn = apiobj.CreatedOn;
    this.CreatedByName = apiobj.CreatedByName;
    this.UpdatedOn = apiobj.UpdatedOn;
    this.UpdatedByName = apiobj.UpdatedByName;
  }
}

export { schema, Audit };
