import MonsterLocationService from "./MonsterLocationService";
class MonsterLocationController {
  constructor() {
    this.monsterLocationService = new MonsterLocationService();
    this.monsterLocationService.createLocation('besaid', ['mons2ter1', "monster2"]);
  }

  displayLocations() {
    this.monsterLocationService.getLocations().forEach((location) => {
      console.log(location.getName());
      console.log("monsters:" + location.getMonsters().toString());
    });
  }
}

export default MonsterLocationController;