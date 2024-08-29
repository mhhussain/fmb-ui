export default class WeekEntity {
  constructor(
    weeklyMenuId,
    weekStart,
    cutoffDateTime,
    emailSent,
    mondayItemCount,
    tuesdayItemCount,
    wednesdayItemCount,
    thursdayItemCount,
    fridayItemCount,
    saturdayItemCount,
    sundayItemCount,
  ) {
    this.weeklyMenuId = weeklyMenuId;
    this.weekStart = weekStart;
    this.cutoffDateTime = cutoffDateTime;
    this.emailSent = emailSent;
    this.mondayItemCount = mondayItemCount;
    this.tuesdayItemCount = tuesdayItemCount;
    this.wednesdayItemCount = wednesdayItemCount;
    this.thursdayItemCount = thursdayItemCount;
    this.fridayItemCount = fridayItemCount;
    this.saturdayItemCount = saturdayItemCount;
    this.sundayItemCount = sundayItemCount;
  };

  static fromJson = (json) => {
    return new WeekEntity(
      json['WeeklyMenuID'],
      json['WeekStart'],
      json['CutoffDateAndTime'],
      json['EmailSent'],
      json['MondayItemCount'],
      json['TuesdayItemCount'],
      json['WednesdayItemCount'],
      json['ThursdayItemCount'],
      json['FridayItemCount'],
      json['SaturdayItemCount'],
      json['SundayItemCount'],
    );
  };
};
