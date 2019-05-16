import starterInsults from './assets/starterInsults.js';

class Player {
  constructor(knownIC) {
    this.msg = '';
    this.knownIC = knownIC;
    this.turnType = 'insult';
    this.roundPoints = 0;
  }

  reset() {
    this.turnType = 'insult';
    this.msg = 0;
    this.roundPoints = 0;
  }

  updateKnownIC(type, msg) {
    const index = type === 'insults' ? -2 : -3;
    let newIC = [...this.knownIC[type]];
    newIC.splice(index, 0, msg);

    return newIC;
  }

  updateChoices() {
    const type = this.turnType === 'insult'
      ? 'insults' : 'comebacks';
    return [...this.knownIC[type]];
  }
}

const player = new Player(Object.assign({}, starterInsults));

export { player };