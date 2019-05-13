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

    this.updateTurnActions = this.updateTurnActions.bind(this);
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

  updateTurnActions(choice) {
    // set the player's choice display
    this.setState({ playerMsg : choice});
    this.props.updatePlayerTurn(); // 'player' or 'pirate'

    if (this.state.playerTurnType === 'insult') {
      // pirate comeback
      this.pirateTurn();
      // check for match
      // if (this.isMatch())
    } else { // player comeback
      console.log('player comeback match check')
      // find player's choice in allInsults
      // if comeback and insult are from same index it's correct
      if (this.isMatch(choice)) {
        console.log('match, player turn to insult')
        this.endRound('insult', null);

        this.playerTurn('insult') // For now, passing the turnType because it's not using the updated state
        // TODO animation and turn start component
      } else {
        // pirate insults

        console.log('wrong. pirate goes again')
        // this.pirateTurn();
      }
    }
  }

  endRound(turnType, winner) {
    this.setState(() => ({
      playerTurnType: turnType,
      winPrevExchange: winner,
      pirateMsg: ''
    }));
    this.props.updatePlayerTurn();
  }

  turnStart() {

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