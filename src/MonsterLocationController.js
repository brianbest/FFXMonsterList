import MonsterLocationService from "./MonsterLocationService.js";
class MonsterLocationController {
  constructor() {
    this.monsterLocationService = new MonsterLocationService();
  }

  displayLocations() {
    this.monsterLocationService.getLocations().forEach((location) => {
      console.log(location.getName());
      console.log("monsters:" + location.getMonsters().toString());
    });
  }

  setLocation(name, monsters) {
    this.monsterLocationService.createLocation(name, monsters);
  }

  getLocations() {
    return this.monsterLocationService.getLocations();
  }
  getTotalNumberOfMonsters(){
    return this.getLocations().reduce((acc, location) => {
      return acc + location.getMonsters().length;
    }, 0);
  }

  getNumberOfMonstersAtMaxCaught() {
    return this.getLocations().reduce((acc, location) => {
      return acc + location.getMonsters().filter(monster => {
        return monster.getCaughtCount() == monster.maxCaptureable;
      }).length;
    }, 0);
  }
}

export default MonsterLocationController;
