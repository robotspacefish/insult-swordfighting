import React, { Component } from 'react'
import Images from '../Images/Images';
import Messages from '../Messages/Messages';
import Choices from '../Choices/Choices';
import Scroll from '../Scroll/Scroll';
import knownInsults from '../assets/knownInsults.js';
import allInsults from '../assets/insults.js';
import EndExchange from '../EndExchange/EndExchange';

export default class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      knownInsults : knownInsults,
      choices: [],
      // currentPirateChoice : allInsults[this.randomIndex(allInsults.length)],
      // currentPlayerChoice: '', // chosen from the btn options
      // playerTurnType: 'comeback',
      playerMsg: '',
      pirateMsg: '',
      exchangeWinner : null
    };

    this.updateRoundActions = this.updateRoundActions.bind(this);
    this.winPrevExchange = null;
    this.currentPirateRoundInsultPool = []; // so pirate doesn't repeat insults
    this.currentPlayerMsg = '';
    this.currentPirateMsg = '';
    this.playerTurnType = 'comeback';
    this.roundLearnedIC = {
      insults : [],
      comebacks : []
    };
  }

  componentDidMount() {
    this.initPirateRound();
    const type = this.playerTurnType === 'insult'
      ? 'insults' : 'comebacks';

    this.setState({ choices: [...knownInsults[type]]});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.playerMsg !== this.currentPlayerMsg) {
      this.setState({ playerMsg : this.currentPlayerMsg});
    }
    if (prevState.pirateMsg !== this.currentPirateMsg) {
      this.setState({ pirateMsg: this.currentPirateMsg });
    }

    // console.log('prevState:',prevState)
  }

  componentWillUnmount() {
    clearInterval(this.delayId);
  }

  delay(func, timeout = 1000) {
    this.delayId = setTimeout(func, timeout);
  }

  /**
   * @desc Start each round with a random pirate insult and put the remaining insults
   * into a pool for the pirate to insult from the remainder of the round
   */
  initPirateRound() {
    // set first pirate insult
    let pool = this.initPirateRoundInsultPool();
    // set a random insult
    if (this.playerTurnType === 'comeback') {
      this.pirateInsult(pool);
      this.setState({ pirateMsg: this.currentPirateMsg })
    }
  }

  /**
   * @desc initialize each round's pool of insults for the pirate so they don't
   * use repeat insults
   */
  initPirateRoundInsultPool() {
    return allInsults.map(i => i.insult);
  }

  /**
   * @desc Randomly select a pirate insult from the current round pool
   */
  pirateInsult(pool = this.currentPirateRoundInsultPool) {
    const insult = pool[this.randomIndex(pool.length)];
    this.currentPirateRoundInsultPool = pool.filter(i => i !== insult);
    this.currentPirateMsg = insult;

    if (this.currentPirateMsg === undefined) {
      // refill insults
      this.initPirateRound();
    }
    return insult;
  }

  pirateComeback() {
    const correctChance = Math.random();
    let res = '';
    if (correctChance > 0.30) {
      // return matching comeback
      res = this.getCorrectResponse();
    } else {
      // return comeback not equal to correct response
      res = this.getIncorrectResponse().comeback;
    }

    this.currentPirateMsg = res;
    return res;
  }

  /**
   * @desc Check if player's insult/comeback is correct with the pirate's insult/comeback
   * @return {Number} matched.length
   */
  isMatch() {
    // TODO refactor
    const notplayerTurnType = this.playerTurnType === 'insult' ? 'comeback' : 'insult';
    const matched = allInsults.filter(i => {
      return i[this.playerTurnType] === this.currentPlayerMsg && i[notplayerTurnType] === this.currentPirateMsg;
    });

    return matched.length > 0;
  }

  updateKnownInsults() {
    // let type = turnType === 'insult' ? 'comebacks' : 'insults';
    // const updatedInsults = Object.assign({}, this.state.knownInsults);

    const updatedInsults = {};
    updatedInsults.insults = [...this.state.knownInsults.insults, ...this.roundLearnedIC.insults];
    updatedInsults.comebacks = [...this.state.knownInsults.comebacks, ...this.roundLearnedIC.comebacks];
    this.setState({ knownInsults : updatedInsults });
  }

  isICUnknown(IC, turnType) {
    let type = turnType === 'insult'
      ? 'comebacks' : 'insults';
    return this.state.knownInsults[type].indexOf(IC) === -1;
  }
  // playerActions(turnType) {
  //   this.setPlayerChoices(turnType);
  //   this.setPlayerTurnType(turnType);
  // }

  pirateActions(turnType) {
    if (turnType === 'insult') {
      this.delay(() => this.pirateComeback());
    } else {
      if (this.isMatch()) {
        this.delay(() => this.pirateInsult());
      }
    }
  }

  matchActions(turnType) {

  }

  /**
   * @desc return the comeback that is paired with the player's chosen insult
   * @return {String} res - the correct comeback
   */
  getCorrectResponse() {
    console.log('getting correct response')
    const res = allInsults.filter(i => (
      i.insult === this.currentPlayerMsg
    ));
    // console.log(res[0].comeback)
    return res[0].comeback;
  }

  checkForWinner() {
    if (this.winPrevExchange === 'player') {
      console.log('*** player wins round ***')
    } else if (this.winPrevExchange === 'pirate') {
      console.log('*** pirate wins round ***')
    }
  }

  handleICMatch() {
    let winner = '';
    // let currentTurnType = this.playerTurnType;
    if (this.isMatch()) {
      winner = 'draw';
      // opposite player insults
      this.toggleTurnType();
    } else {
      winner = this.playerTurnType === 'insult'
        ? 'player' : 'pirate';

      if (winner === 'player') {
        this.playerTurnType = 'insult';
      } else {
        this.currentPlayerMsg = '';
        this.playerTurnType = 'comeback';
      }
    }  return winner;
  }

  getIncorrectResponse() {
    console.log('getting incorrect response')
    let res = '';
    do {
      const index = this.randomIndex(allInsults.length);
      res = allInsults[index];
    } while (res.insult === this.currentPlayerMsg);

    return res;
  }

  removeInsultFromPool(insultToRemove) {
    this.currentPirateRoundInsultPool = this.currentPirateRoundInsultPool.filter(i => (
      i !== insultToRemove
    ));
  }

  randomIndex(len) {
    return Math.floor(Math.random() * len);
  }

  setPlayerMsg(msg) {
    this.setState({ playerMsg: msg });
  }

  /**
   * @desc handles the pirate actions and set up of player choices
   * @param {String} choice - user's selected insult or comeback
   */
  updateRoundActions(choice) {
    this.setState({ exchangeWinner : null });
    const prevPlayerTurnType = this.playerTurnType;
    // set class property to use within functions since state doesn't update right away
    this.currentPlayerMsg = choice;
    let pirateComeback = '';

    if (this.playerTurnType === 'insult') {
      pirateComeback = this.pirateComeback();
    }
    const winner = this.handleICMatch();
    debugger;
    if (pirateComeback !== '' && winner === 'draw'
      && this.isICUnknown(pirateComeback, prevPlayerTurnType)) {
      this.roundLearnedIC.comebacks.push(pirateComeback)
        console.log(this.roundLearnedIC.comebacks)
    }

    this.setPlayerChoices(this.playerTurnType);

    if (this.playerTurnType === 'comeback') {
      // debugger;
      const insult = this.pirateInsult();

      if (this.state.knownInsults.insults.indexOf(insult) === -1) {
        this.roundLearnedIC.insults.push(insult);
      }
    }
    this.setState({ exchangeWinner : winner })



    // TODO if 2 rounds won by same person/computer
    // this.endRound
    // this.clearMsgs();

  }

  clearMsg(msgType) {
    this.setState({ [msgType]: '' });
    // this.setState({ pirateMsg : '', playerMsg : '' })
  }

  setPlayerInsults() {
    this.setState({ choices: [...this.state.knownInsults.insults] });
  }

  setPlayerComebacks() {
    this.setState({ choices: [...this.state.knownInsults.comebacks] });
  }

  setPlayerChoices(turnType) {
    let type = `${turnType}s`;
    this.setState({ choices: this.state.knownInsults[type].map(i => i) });
  }

  endRound(turnType, winner) {
    this.playerTurnType = turnType;
    this.winPrevExchange = winner;
    // this.setState(() => ({
    //   pirateMsg: ''
    // }));
    // this.props.updatePlayerTurn();
  }

  playerTurn(turnType) {
    this.updatePlayerChoices(turnType);
  }

  /**
   * @desc Updates the player's choice in state based on option clicked
   * @param {String} choice
   */
  updateSelectedChoice(choice) {
    this.setState({ currentPlayerChoice : choice})
  }

  updatePlayerChoices(turnType) {
    const insults = Object.assign({}, this.state.knownInsults);
    this.setState(st => ({
      choices : turnType === 'insult' ? [...insults.insults] : [...insults.comebacks]
    }))
  }

  setPlayerTurnType(newTurnType) {
    this.playerTurnType = newTurnType;
  }

  toggleTurnType() {
    this.playerTurnType = this.playerTurnType === 'insult'
      ? 'comeback' : 'insult';
  }

  render() {
    return (
      <div className="Fight container">
        <Images />
        <Messages
           playerMsg={this.state.playerMsg}
           pirateMsg={this.state.pirateMsg}
         />
        {
          this.state.exchangeWinner !== null &&
          <EndExchange
            winner={this.state.exchangeWinner}
            turnType={this.playerTurnType}
          />
        }
         <Scroll>
          <Choices
              choices={this.state.choices}
              updatePlayerTurn={this.props.updatePlayerTurn}
              updateRoundActions={this.updateRoundActions}
          />
        </Scroll>
      </div>
    )
  }
}