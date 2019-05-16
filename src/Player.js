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

  setChoices() {
    let type = `${this.turnType}s`;
    return this.state.knownInsults[type].map(i => i) ;
  }

  updateKnownIC(newIC) {
    this.knownIC.insults = [...this.knownIC.insults, ...newIC.insults];
    this.knownIC.comebacks = [...this.knownIC.comebacks, ...newIC.comebacks];
  }

  updateChoices() {
    const type = this.turnType === 'insult'
      ? 'insults' : 'comebacks';
    return [...this.knownIC[type]];
  }
}

const player = new Player(Object.assign({}, starterInsults));

export { player };