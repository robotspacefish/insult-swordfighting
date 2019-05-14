import React, { Component } from 'react'
import Images from '../Images/Images';
import Messages from '../Messages/Messages';
import Choices from '../Choices/Choices';
import Scroll from '../Scroll/Scroll';
// import knownInsults from '../assets/knownInsults.js';
import allInsults from '../assets/insults.js';
import EndExchange from '../EndExchange/EndExchange';
import Pirate from '../Pirate';
import { player } from '../Player';
import { delay } from '../helpers';

export default class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRound : false,
      exchangeWinner: null,
      choices: [],
      playerMsg: '',
      pirateMsg: ''
    };

    this.updateRound = this.updateRound.bind(this);
    this.winPrevExchange = null;

    this.roundLearnedIC = {
      insults : [],
      comebacks : []
    };

    this.pirate = new Pirate('comeback', [...allInsults]);
  }

  componentDidMount() {
    // console.log('FIGHT: component did mount')
    // this.state.pirate.action();
    this.setState({ choices : player.updateChoices() })
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('FIGHT: component did update')

    // console.log('player',player)
    // console.log('pirate:',this.pirate)
    console.log('component did update', prevState)
    console.log('player:', player.turnType, '| pirate:', this.pirate.turnType)
  }

  initPirate() {
    // create a new pirate
    return new Pirate('comeback', allInsults);
  }


  /**
   * @desc initialize each round's pool of insults for the pirate so they don't
   * use repeat insults
   */
  initPirateRoundInsultPool() {
    return allInsults.map(i => i.insult);
  }


  // updateKnownInsults() {
  //   // let type = turnType === 'insult' ? 'comebacks' : 'insults';
  //   // const updatedInsults = Object.assign({}, this.state.knownInsults);

  //   const updatedInsults = {};
  //   updatedInsults.insults = [...this.state.knownInsults.insults, ...this.roundLearnedIC.insults];
  //   updatedInsults.comebacks = [...this.state.knownInsults.comebacks, ...this.roundLearnedIC.comebacks];
  //   this.setState({ knownInsults : updatedInsults });
  // }

  /**
   * @desc Check if player's insult/comeback is correct with the pirate's insult/comeback
   * @return {Number} matched.length
   */
  isMatch() {
    // TODO refactor with find?

    const matched = allInsults.filter(i => {

      return i[player.turnType] === player.msg && i[this.pirate.turnType] === this.pirate.msg;
    });

    return matched.length > 0;
  }
  // isMatch() {
  //   // TODO refactor
  //   const notplayerTurnType = this.playerTurnType === 'insult' ? 'comeback' : 'insult';
  //   const matched = allInsults.filter(i => {
  //     return i[this.playerTurnType] === this.currentPlayerMsg && i[notplayerTurnType] === this.currentPirateMsg;
  //   });

  //   return matched.length > 0;
  // }

  nextExchange() {
    let playerMsg = player.turnType === 'insult'
      ? player.msg : null ;

      this.pirate.action(allInsults, playerMsg);

    // set choices
    setTimeout(() => {
      this.setState({ choices: player.updateChoices() });
    }, 2000);
  }

  clearPrevExchangeDisplays() {
    // clear messages and choices
    setTimeout(() => {
      this.setState({ pirateMsg: '', playerMsg: '', choices: [] })
    }, 1000);

    if (player.turnType === 'insult') {
      // TODO
    } else {
      setTimeout(() => {
        this.setState({ pirateMsg: this.pirate.msg, playerMsg: '' })
      }, 1800);
    }
  }

  isICKnown(IC, turnType) {
    let type = turnType === 'insult'
      ? 'comebacks' : 'insults';
    if (this.state.knownInsults[type].indexOf(IC) === -1) {
      return false;
    }
    return true;
  }

  checkForWinner() {
    if (this.winPrevExchange === 'player') {
      console.log('*** player wins round ***')
    } else if (this.winPrevExchange === 'pirate') {
      console.log('*** pirate wins round ***')
    }
  }

  /**
   * @desc handles the pirate actions and set up of player choices
   * @param {String} choice - user's selected insult or comeback
   */
  updateRound(choice) {

    player.msg = choice;
    this.setState({ playerMsg : player.msg });

    this.pirate.action(allInsults, player.msg)

    setTimeout(() => {
      debugger
      // TODO fix pirate going twice in a row
      // update msgs in state
      // this.updateMsgsInState();
      this.setState({ pirateMsg : this.pirate.msg });
      let winner = '';
      if (this.isMatch()) {
        winner = 'draw';
        this.swapTurnTypes();
        player.roundPoints = 0;
        this.pirate.roundPoints = 0;
      } else {
        if (player.turnType === 'insult') {
          winner = 'player';
          player.roundPoints++;
        } else {
          winner = 'pirate';
          this.pirate.roundPoints++;
        }
      }

      this.nextExchange();
      this.clearPrevExchangeDisplays();
    }, 500);
  }

  /**
   * @desc swap turn types of player and pirate
   */
  swapTurnTypes() {
    let nextTurnType = player.turnType === 'insult' ? 'comeback' : 'insult';

    this.pirate.turnType = player.turnType;
    player.turnType = nextTurnType;
    console.log('swapping:', player.turnType)
  }

  updateMsgsInState() {
    this.setState({ playerMsg: player.msg, pirateMsg: this.pirate.msg });
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
    // console.log('FIGHT: render()')
    return (
      <div className="Fight container">
        <Images />
        <Messages
           playerMsg={this.state.playerMsg}
           pirateMsg={this.state.pirateMsg}
           playerTurnType={player.turnType}
         />
        {
          this.state.exchangeWinner !== null &&
          <EndExchange
            winner={this.state.exchangeWinner}
            turnType={this.state.player.turnType}
          />
        }
         <Scroll>
          <Choices
              choices={this.state.choices}
              updatePlayerTurn={this.props.updatePlayerTurn}
              updateRoundActions={this.updateRound}
          />
        </Scroll>
      </div>
    )
  }
}