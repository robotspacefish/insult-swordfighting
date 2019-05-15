import { randomIndex } from './helpers';

export default class Pirate {
  constructor(turnType, allInsults) {
    this.msg = '';
    this.insultPool = allInsults.map(i => i.insult); // the pool to start each round
    this.turnType = 'comeback';
    this.roundPoints = 0;
  }

  insult() {
    const pool = this.insultPool;
    this.msg = pool[randomIndex(pool.length)];
    this.insultPool = pool.filter(i => i !== this.msg);

    // if (this.currentPirateMsg === undefined) {
    //   // refill insults
    //   this.initPirateRound();
    // }
    console.log('getting insult', this.msg)
    return this.msg;
  }

  comeback(allInsults, playerInsult) {
    const correctChance = Math.random();
    if (correctChance > 0.30) {
      this.msg = this.getCorrectResponse(allInsults, playerInsult);
    } else {
      this.msg = this.getIncorrectResponse();
    }
    console.log('getting comeback:',this.msg)
    return this.msg;
  }

  /**
     * @desc return the comeback that is paired with the player's chosen insult
     * @return {String} res - the correct comeback
     */
  getCorrectResponse(allInsults, playerInsult) {
// debugger
    console.log('getting correct response')
    const res = allInsults.filter(i => (
      i.insult === playerInsult
    ));
    return res[0].comeback;
  }

  // getIncorrectResponse(allInsults, playerInsult) {
  //   console.log('getting incorrect response')
  //   let res = '';
  //   do {
  //     const index = randomIndex(allInsults.length);
  //     res = allInsults[index];
  //   } while (res.insult === playerInsult);

  //   return res;
  // }

  getIncorrectResponse() {
    let pool = [
      "Oh yeah?",
      "I'm shaking, I'm shaking",
      "I am rubber, you are glue."
    ];

    return pool[randomIndex(pool.length)];
  }

  action(allInsults, playerInsult) {
    if (this.turnType === 'insult') {
      this.insult();
    } else {
      this.comeback(allInsults, playerInsult);
    }
  }
}