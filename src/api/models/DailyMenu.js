import { object, number, date } from 'yup';
import { Audit } from '@/models/Audit';

const schema = object({
  DailyMenuID: number().required(),
  Date: date().required(),
  FillSchedule_FillScheduleID: number().required(),
});

class DailyMenu extends Audit {
  constructor(apiobj) {
    super(apiobj);
    this.DailyMenuID = apiobj.DailyMenuID;
    this.Date = apiobj.Date;
    this.FillSchedule_FillScheduleID = apiobj.FillSchedule_FillScheduleID;
  };
};

export { schema, DailyMenu };
