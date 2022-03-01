import Location from "./Location";
import Monster from "./Monster";

class MonsterLocationService {
  constructor(){
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