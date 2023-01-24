import { object, number, string } from 'yup';
import { Audit } from '@/models/Audit';

const schema = object({
  DailyMenuItemID: number().required(),
  Description: string().required(),
  DailyMenu_DailyMenuID: number().required(),
});

class DailyMenuItem extends Audit {
  constructor(apiobj) {
    super(apiobj);
    this.DailyMenuItemID = apiobj.DailyMenuItemID;
    this.Description = apiobj.Description;
    this.DailyMenu_DailyMenuID = apiobj.DailyMenu_DailyMenuID;
  };
};

export { schema, DailyMenuItem };
