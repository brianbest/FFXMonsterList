class Location {
  constructor(name, monsters){
    this.name = name;
    this.monsters = monsters;
  }

  getName(){
    return this.name;
  }

  getMonsters() {
    return this.monsters;
  }
}

export default Location;