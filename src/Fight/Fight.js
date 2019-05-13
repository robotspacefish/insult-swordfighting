import React, { Component } from 'react'
import Images from '../Images/Images';
import Messages from '../Messages/Messages';
import Choices from '../Choices/Choices';
import Scroll from '../Scroll/Scroll';
import knownInsults from '../assets/knownInsults.js';
import allInsults from '../assets/insults.js';

export default class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [...knownInsults.comebacks], // starts as comebacks
      // currentPirateChoice : allInsults[this.randomIndex(allInsults.length)],
      // currentPlayerChoice: '', // chosen from the btn options
      // playerTurnType: 'comeback',
      playerMsg: '',
      pirateMsg: '',
    };

    this.updateRoundActions = this.updateRoundActions.bind(this);
    this.winPrevExchange = null;
    this.currentPirateRoundInsultPool = []; // so pirate doesn't repeat insults
    this.currentPlayerMsg = '';
    this.currentPirateMsg = '';
    this.playerTurnType = 'comeback';
  }

  componentDidMount() {
    this.initRound();
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
  initRound() {
    // set first pirate insult
    let pool = this.initPirateRoundInsultPool();
    // set a random insult
    this.pirateInsult(pool);
    this.setState({ pirateMsg: this.currentPirateMsg })
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
  }

  pirateComeback() {
    const correctChance = Math.random();
    // if (correctChance > 0.60) {
      // return matching comeback
    this.currentPirateMsg = this.getCorrectResponse();
    // } else {
      // return comeback not equal to correct response
      // this.currentPirateMsg = this.getIncorrectResponse().comeback;
    // }
  }

  /**
   * @desc Check if player's insult/comeback is correct with the pirate's insult/comeback
   * @return {Number} matched.length
   */
  isMatch() {
    const notplayerTurnType = this.playerTurnType === 'insult' ? 'comeback' : 'insult';
    const matched = allInsults.filter(i => {
      return i[this.playerTurnType] === this.currentPlayerMsg && i[notplayerTurnType] === this.currentPirateMsg;
    });

    return matched.length > 0;
  }

  playerActions(turnType) {
    this.setPlayerChoices(turnType);
    this.setPlayerTurnType(turnType);
  }

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
    console.log(res[0].comeback)
    return res[0].comeback;
  }

  checkForWinner() {
    if (this.winPrevExchange === 'player') {
      console.log('*** player wins round ***')
    } else if (this.winPrevExchange === 'pirate') {
      console.log('*** pirate wins round ***')
    }
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

  updateRoundActions(choice) {
    // set class property to use within functions since state doesn't update right away
    let pirateAction = this.playerTurnType === 'insult'
      ? this.pirateComeback.bind(this) : this.pirateInsult.bind(this);

    pirateAction();
    let newTurnType = '';
    this.currentPlayerMsg = choice;
    if (this.isMatch()) {
      newTurnType = 'comeback';
      if (newTurnType === 'insult') {
        console.log('match, no winner.\n player turn to insult')
      } else {
        console.log('match, no winner.\n pirate turn to insult')
      }
    } else {
      newTurnType = 'insult';
    }

    this.playerActions(newTurnType);


    // this.setPlayerChoices('insult');
    // if (this.playerTurnType === 'insult') {
    //   this.delay(() => this.pirateComeback());
    //   if (this.isMatch()) {
    //     console.log('match, no winner\n pirate turn to insult')
    //     this.winPrevExchange = null;
    //     this.setPlayerComebacks();
    //     this.setPlayerTurnType('comeback');

    //     this.delay(() => this.pirateInsult());
    //   } else {
    //     console.log('player wins\n player insults again')
    //     this.winPrevExchange = 'player';
    //     this.setPlayerTurnType('insult');
    //     this.setPlayerInsults();
    //   }
    // } else { // player comeback
    //   if (this.isMatch()) { // success
    //     console.log('match, no winner\n player turn to insult');

    //     this.winPrevExchange = null;

    //     this.setPlayerInsults();
    //     this.setPlayerTurnType('insult');
    //   } else { // failure
    //     console.log('pirate wins.\n pirate insults again')
    //     this.winPrevExchange = 'pirate';
    //     this.setPlayerTurnType('comeback');
    //     this.setPlayerComebacks();

    //     this.delay(() => this.pirateInsult());
    //   }
    // }

    // TODO if 2 rounds won by same person/computer
    // this.endRound
    // this.clearMsgs();

  }

  clearMsgs(msgType) {
    this.setState({ [msgType]: '' });
  }

  setPlayerInsults() {
    this.setState({ choices: [...knownInsults.insults] });
  }

  setPlayerComebacks() {
    this.setState({ choices: [...knownInsults.comebacks] });
  }

  setPlayerChoices(turnType) {
    let type = `${turnType}s`;

    // this.setState({ choices: [...knownInsults[type]] });
    this.setState({ choices: knownInsults[type].map(i => i) });
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
    const insults = Object.assign({}, knownInsults);
    this.setState(st => ({
      choices : turnType === 'insult' ? [...insults.insults] : [...insults.comebacks]
    }))
  }

  setPlayerTurnType(turnType) {
    this.playerTurnType = turnType;
  }

  render() {
    return (
      <div className="Fight container">
        <Images />
        <Messages
           playerMsg={this.state.playerMsg}
           pirateMsg={this.state.pirateMsg}
         />
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

// const turn = () => {
//   let insults = [...knownInsults.insults];
//   let comebacks = [...knownInsults.comebacks]

//   displayPlayerInsultChoices(playerTurnType === 'insults' ? insults : comebacks);
// };

// const displayPlayerInsultChoices = (choices => choices.map(choice => ));