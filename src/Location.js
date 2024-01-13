import Monster from "./Monster.js";

class Location {
  constructor(name, monsters) {
    this.name = name;
    this.id = name.replace(" ", "-") + "-" + Math.floor(Math.random() * 1000000);
    this.monsters = monsters.map(monster => {
      return new Monster(monster.name);
    });
  }

  getName() {
    return this.name;
  }

  getMonsters() {
    return this.monsters;
  }

  getMonstersAsObjects() {
    return this.monsters.map(monster => {
      return monster.toObject();
    });
  }

  toObject() {
    return {
      name: this.getName(),
      monsters: this.getMonstersAsObjects()
    }
  }
}

export default Location;
