class Monster {
  constructor(name) {
    this.name = name;
    this.id = name.replace(" ", "-") + "-" + Math.floor(Math.random() * 1000000);
    this.numberCaught = 0;
  }

  getName() {
    return this.name;
  }

  incermentCaught() {
    if (this.numberCaught == 10) {
      return;
    }

    this.numberCaught++;
  }

  decrmentCaught() {
    if (this.numberCaught == 0) {
      return;
    }

    this.numberCaught--;
  }

  getCaughtCount() {
    return this.numberCaught;
  }

  toObject() {
    return {
      name: this.getName()
    };
  }
}

export default Monster;
