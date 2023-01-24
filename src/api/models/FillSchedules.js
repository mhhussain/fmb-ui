import { object, date, number } from 'yup';
import { Audit } from '@/models/Audit';

const schema = object({
  FillScheduleID: number().required(),
  FillingDate: date().required(),
  ThaaliCoordinator_UserId: number().nullable(),
  WeeklyMenu_WeeklyMenuID: number().nullable(),
});

class FillSchedules extends Audit {
  constructor(apiobj) {
    super(apiobj);
    this.FillScheduleID = apiobj.FillScheduleID;
    this.FillingDate = apiobj.FillingDate;
    this.ThaaliCoordinator_UserId = apiobj.ThaaliCoordinator_UserId;
    this.WeeklyMenu_WeeklyMenuID = apiobj.WeeklyMenu_WeeklyMenuID;
  };
};

export { schema, FillSchedules };
