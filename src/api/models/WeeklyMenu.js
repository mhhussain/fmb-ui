import { object, string, number, date, boolean } from 'yup';
import { Audit } from '@/models/Audit';

const schema = object({
  WeeklyMenuID: number().required(),
  WeekStart: date().nullable(),
  CutoffDateAndTime: date().required(),
  SpecialNote: string().nullable(),
  EmailSent: boolean().nullable(),
});

class WeeklyMenu extends Audit {
  constructor(apiobj) {
    super(apiobj);
    this.WeeklyMenuID = apiobj.WeeklyMenuID;
    this.WeekStart = apiobj.WeekStart;
    this.CuttoffDateAndTime = apiobj.CuttoffDateAndTime;
    this.SpecialNote = apiobj.SpecialNote;
    this.EmailSent = apiobj.EmailSent;
  };
};

export { schema, WeeklyMenu };
