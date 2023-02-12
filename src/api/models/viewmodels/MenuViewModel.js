class MenuViewModel {
    constructor(obj) {
        this.DailyMenuID = obj.DailyMenuID;
        this.fillDate = obj.fillDate;
        this.date = obj.date;
        this.items = obj.items;
    };
  };
  
  export { MenuViewModel };
  