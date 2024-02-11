class Monster {
  constructor(name) {
    this.name = name;
    this.id = name.replace(" ", "-") + "-" + Math.floor(Math.random() * 1000000);
    this.numberCaught = 0;
    this.maxCaptureable = 10;
  }

  getName() {
    return this.name;
  }

  incermentCaught() {
    if (this.numberCaught == this.maxCaptureable) {
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

  setMaxCaught() {
    this.numberCaught = this.maxCaptureable;
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
