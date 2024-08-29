import * as MenuApi from '../../api/local/menu_api';
import WeekEntity from '../entities/week_entity';

export async function getWeeklyMenusList() {
  // run request to backend
  const data = await MenuApi.getWeeklyMenusList();

  return data.map((w) => WeekEntity.fromJson(w));
};
