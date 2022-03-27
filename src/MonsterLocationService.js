import Location from "./Location.js";
import Monster from "./Monster.js";

class MonsterLocationService {
  constructor() {
    this.locationList = [];
  }

  createLocation(locationName, namesOfMonsters) {
    this.locationList.push(new Location(locationName, namesOfMonsters));
  }

  getLocations() {
    return this.locationList;
  }

}

export default MonsterLocationService;
