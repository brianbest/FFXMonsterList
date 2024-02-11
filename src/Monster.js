class Monster {
  constructor(name) {
    this.name = name;
    this.id = name.replace(" ", "-") + "-" + Math.floor(Math.random() * 1000000);
    this.numberCaught = 0;
    this.maxCaptureable = 10;
    this.incrementCaught = this.incrementCaught.bind(this);
    this.decrementCaught = this.decrementCaught.bind(this);
    this.setMaxCaught = this.setMaxCaught.bind(this);
  }

  getName() {
    return this.name;
  }

  incrementCaught() {
    if (this.numberCaught == this.maxCaptureable) {
      return;
    }

    this.numberCaught++;
  }

  decrementCaught() {
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
