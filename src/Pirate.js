import { randomIndex } from './helpers';
import allInsults from './assets/insults.js';

export default class Pirate {
  constructor(turnType) {
    this.msg = '';
    this.insultPool = this.initPool(); // the pool to start each round
    this.turnType = 'comeback';
    this.roundPoints = 0;
    this.matchedComeback = false;
  }

  /**
 * @desc initialize each round's pool of insults for the pirate so they don't
 * use repeat insults
 */
  initPool() {
    return allInsults.map(i => i.insult);
  }

  insult() {
    if (this.insultPool.length === 0) {
      // refill insults for now,
      // TODO maybe end the round in the future
      this.insultPool = this.initPool();
    }

    const pool = this.insultPool;

    this.msg = pool[randomIndex(pool.length)];
    this.insultPool = pool.filter(i => i !== this.msg);

    // console.log('getting insult', this.msg)
    return this.msg;
  }

  comeback(playerInsult) {
    this.matchedComeback = false; // reset

    const correctChance = Math.random();
    if (correctChance > 0.30) {
      this.msg = this.getCorrectResponse(playerInsult);
      this.matchedComeback = true;
    } else {
      this.msg = this.getIncorrectResponse();
    }
    // console.log('getting comeback:',this.msg)
    return this.msg;
  }

  /**
     * @desc return the comeback that is paired with the player's chosen insult
     * @return {String} res - the correct comeback
     */
  getCorrectResponse(playerInsult) {
    // console.log('getting correct response')

    const res = allInsults.filter(i => (
      i.insult === playerInsult
    ));
    return res[0].comeback;
  }

  getIncorrectResponse() {
    let pool = [
      "Oh yeah?",
      "I'm shaking, I'm shaking.",
      "I am rubber, you are glue."
    ];

    return pool[randomIndex(pool.length)];
  }

  action(playerInsult) {
    if (this.turnType === 'insult') {
      this.insult();
    } else {
      this.comeback(playerInsult);
    }
  }
}