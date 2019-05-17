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

  /**
   * @desc Check if the player uses a nonsense insult that has no
   * matching comeback, ex. 'Oh yeah?'
   * @return {Boolean} index of the insult in the player's known insults
   * being one of the nonsense insults or not
   */
  isNonsenseInsult() {
    let index = this.knownIC.insults.indexOf(this.msg)
    return index >= this.knownIC.insults.length - 2;
  }

}

const player = new Player(Object.assign({}, starterInsults));

export { player };