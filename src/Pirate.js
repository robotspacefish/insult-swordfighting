import { randomIndex } from './helpers';
import allInsults from './assets/insults.js';

export default class Pirate {
  /**
   * @param {Number} round - the current fight round
   * msg - the pirate's insult or comeback
   * insultPool - the pool of insults for the pirate to randomly respond with
   *  This is refreshed each round with all the insults
   * turnType - whether it's the pirates turn to 'insult' or 'comeback'
   *  This starts each round as 'comeback'
   * roundPoints - points gained for winning exchanges
   * matchedComeback - This starts each exchange as false
   *  and is true if the pirate's comeback will be the correct response to the player's insult
   */
  constructor(round) {
    this.msg = '';
    this.insultPool = this.initPool(); // the pool to start each round
    this.turnType = 'comeback';
    this.roundPoints = 0;
    this.matchedComeback = false;
    this.round = round;
  }

  /**
 * @desc initialize each round's pool of insults
 * @return {Array} all the insults available
 */
  initPool() {
    return allInsults.map(i => i.insult);
  }

  /**
   * @desc set this.msg to a random insult from the insult pool
   * @return this.msg - The new insult
   */
  insult() {
    if (this.insultPool.length === 0) {
      // refill insults for now,
      // TODO maybe end the round in the future
      this.insultPool = this.initPool();
    }

    const pool = this.insultPool;

    this.msg = pool[randomIndex(pool.length)];
    this.insultPool = pool.filter(i => i !== this.msg);

    return this.msg;
  }

  /**
   * @desc Set the pirate response to the insult chosen by the player.
   *  The response correctness is based on chance
   * @param {String} playerInsult - The insult the player chose
   * @return this.msg - the comeback
   */
  comeback(playerInsult) {
    this.matchedComeback = false; // reset

    const correctChance = Math.random();
    const difficulty = this.round < 4 ? .30 : 0;

    if (correctChance > difficulty) {
      this.msg = this.getCorrectResponse(playerInsult);
      this.matchedComeback = true;
    } else {
      this.msg = this.getIncorrectResponse();
    }

    return this.msg;
  }

 /**
 * @desc return the comeback that is paired with the player's chosen insult
 * @param {String} playerInsult - the player's chosen insult
 * @return {String} call getIncorrectResponse if the player's insult was a nonsense one
 * @return {String} res - the correct comeback
 */
  getCorrectResponse(playerInsult) {
    const res = allInsults.filter(i => (
      i.insult === playerInsult
    ));

    if (res.length === 0) {
      // if player's insult isn't one of the matching insult/comebacks
      return this.getIncorrectResponse();
    } else {
      return res[0].comeback;
    }
  }

  /**
  * @desc return an incorrect comeback to the player's insult
  * @return {String} res - the incorrect comeback
  */
  getIncorrectResponse() {
    let pool = [
      "Oh yeah?",
      "I'm shaking, I'm shaking.",
      "I am rubber, you are glue."
    ];
    let index = randomIndex(pool.length);
    let res = pool[index];
    return res ;
  }

  /**
   * @desc remove an insult the player used from the pirate's pool so there's more variety
   */
  removeInsultSpokenByPlayer(insult) {
    this.insultPool = this.insultPool.filter(i => i !== insult );
  }
}