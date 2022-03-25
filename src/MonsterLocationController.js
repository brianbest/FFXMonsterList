import MonsterLocationService from "./MonsterLocationService";
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
}

export default MonsterLocationController;
