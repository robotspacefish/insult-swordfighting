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
      knownInsults: knownInsults,
      allInsults: allInsults,
      choices: [...knownInsults.comebacks], // starts as comebacks
      currentRoundInsultPool : [], // so pirate doesn't repeat insults
      currentPirateChoice : allInsults[this.randomIndex(allInsults.length)],
      currentPlayerChoice: '',
      playerTurnType: 'comeback',
      playerMsg: '',
      pirateMsg: '',
      winPrevExchange : null
    };

    this.updateRoundActions = this.updateRoundActions.bind(this);
  }

  componentDidMount() {
    this.initRound();
  }

  initRound() {
    let pool = allInsults.map(i => i.insult);

    // set a random insult
    let insult = pool[this.randomIndex(pool.length)];

    this.setState({
      currentRoundInsultPool: pool.filter(i => i !== insult),
      pirateMsg: insult
    });
  }

  pirateTurn() {
    if (this.state.playerTurnType === 'insult') {
      // pirate comeback
      let correctChance = Math.random();
      let res = '';
      // let comeback = allInsults.filter(i => i.insult === this.state.playerMsg);

      // if (correctChance > 0.60) {
      // return matching comeback
      res = this.getCorrectResponse();
      console.log(res)
      // } else {
        // return comeback not equal to correct response
        // res = this.getIncorrectResponse().comeback;
        // console.log('incorrect')
      // }
    } else { // pirate insult
      const index = this.randomIndex(this.state.currentRoundInsultPool.length)
      const insult = this.state.currentRoundInsultPool[index];
      let pool = this.removeInsultFromPool(insult);
      this.setState({
        currentRoundInsultPool: pool,
        playerTurnType: 'comeback',
        pirateMsg: insult
      })
    }
  }

  isMatch(choice) {
    const playerTurnType = this.state.playerTurnType;
    const notplayerTurnType = playerTurnType === 'insult' ? 'comeback' : 'insult';
    const matched = allInsults.filter(i => {
      return i[playerTurnType] === choice && i[notplayerTurnType] === this.state.pirateMsg;
    });

    return matched.length > 0;
  }

  getCorrectResponse() {
    const res = allInsults.filter(i => {
      console.log(`comparing ${i.insult} to ${this.state.playerMsg}`)
      return i.insult === this.state.playerMsg
    });
    return res;
  }

  getIncorrectResponse() {
    let res = '';
    while (res !== this.state.playerMsg) {
      const index = this.randomIndex[allInsults.length];
      res = allInsults[index];
    }
    return res;
  }

  pirateInsult() {

  }

  removeInsultFromPool(insultToRemove) {
    this.setState( {currentRoundInsultPool : this.state.currentRoundInsultPool.filter(i => {
      return i !== insultToRemove;
    })});
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
    const insults = Object.assign({}, this.state.knownInsults);
    this.setState(st => ({
      choices : turnType === 'insult' ? [...insults.insults] : [...insults.comebacks]
    }))
  }

  toggleplayerTurnType = () => {
    let playerTurnType = this.state.playerTurnType === 'insult' ? 'comeback' : 'insult';
    this.setState({ playerTurnType });
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
              updateTurnActions={this.updateTurnActions}
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