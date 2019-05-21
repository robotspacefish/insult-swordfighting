import starterInsults from './assets/starterInsults.js';

class Player {
  /**
   * @param {Object} knownIC - the default insults/comebakcs from starterInsults.js
   * msg - the player's chosen insult or comeback
   * turnType  whether it's the player's turn to 'insult' or 'comeback'
   *  This starts each round as 'insult'
   * roundPoints - points gained for winning exchanges
   */
  constructor(knownIC) {
    this.msg = '';
    this.knownIC = knownIC;
    this.turnType = 'insult';
    this.roundPoints = 0;
  }

  /**
   * @desc sets up player for the next fight round
   */
  reset() {
    this.turnType = 'insult';
    this.msg = 0;
    this.roundPoints = 0;
  }

  /**
   * @desc Add the new insult or comeback into the player's known insult/comeback array at the correct index
   * @param {String} type - either insult or comeback, used to know which index to start splicing at in the given array
   * @param {String} msg  - the insult/comeback to add
   * @return {Array} newIC - a new array of insults or comebacks that includes the originals plus the new one
   */
  updateKnownIC(type, msg) {
    const index = type === 'insults' ? -2 : -3;
    let newIC = [...this.knownIC[type]];
    newIC.splice(index, 0, msg);
    return newIC;
  }


  /**
   * @desc Updates the displayed choices for the player to choose from
   * @return {Array} this.knownIC[type] - either array of insults or comebacks depending on the player's turn type
   */
  updateChoices() {
    const type = this.turnType === 'insult'
      ? 'insults' : 'comebacks';
    return this.knownIC[type];
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