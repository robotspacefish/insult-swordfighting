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

const TIMEOUT_DELAY = 1800;

export default class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRound : false,
      exchangeWinner: null,
      roundWinner : null,
      choices: [],
      playerMsg: '',
      pirateMsg: ''
    };

    this.updateRound = this.updateRound.bind(this);
    this.winPrevExchange = null;

    this.pirate = new Pirate('comeback');
  }

  componentDidMount() {
    this.setState({ choices : player.updateChoices() })
  }

  componentDidUpdate(prevProps, prevState) {
  }

  initPirate() {
    // create a new pirate
    return new Pirate('comeback');
  }

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

  nextExchange() {
    this.pirate.turnType === 'insult' && this.pirate.insult();

    // set choices
    setTimeout(() => {
      this.setState({ choices: player.updateChoices() });
    }, TIMEOUT_DELAY * 2);
  }

  clearPrevExchangeDisplays() {
    // clear messages and choices
    setTimeout(() => {
      this.setState({
        pirateMsg: '',
        playerMsg: '',
        choices: [],
        exchangeWinner: null
      })
    }, TIMEOUT_DELAY);

    if (player.turnType === 'comeback') {
      setTimeout(() => {
        this.setState({
          pirateMsg: this.pirate.msg,
          // playerMsg: ''
        })
      }, TIMEOUT_DELAY + 800);
    }
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

    const prevPirateTurnType = this.pirate.turnType;

    if (this.pirate.turnType === 'comeback') {
      this.pirate.comeback(player.msg);
    }

    setTimeout(() => {
      this.setState({ pirateMsg : this.pirate.msg });

      let winner = '';
      if (this.isMatch()) {
        winner = 'draw';
        this.swapTurnTypes(); // TODO FIX: this causes pirate comeback
                              // to appear above player insult

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

      this.addICToKnown(prevPirateTurnType);

      // if (player.roundPoints === 2 || this.pirate.roundPoints === 2) {
        // this.endRound(winner);
      // } else {
        this.setState({ exchangeWinner: winner });
        this.nextExchange();
      // }
      this.clearPrevExchangeDisplays();

    }, TIMEOUT_DELAY/2);
  } // end updateRound() ==============================================

  addIfUnknown(type, msg) {
    if (player.knownIC[type].indexOf(msg) === -1) {
      console.log(`learned ${type}: ${msg}`)
      player.knownIC[type].push(msg);
    }
  }

  addICToKnown(type) {
    // add new insult/comeback if possible
    if (type === 'comeback' && this.pirate.matchedComeback) {
      this.addIfUnknown('comebacks', this.pirate.msg);
    }
    if (type === 'insult') {
      this.addIfUnknown('insults', this.pirate.msg);
    }
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

  endRound(winner) {
    // set newRound to true and/or set up new round with function
    // set exchangeWinner to display
    this.setState({
      roundWinner : winner
    })
  }

  render() {
    // console.log('FIGHT: render()')
    return (
      <div className="Fight container">
        {/* <Images /> */}
        <Messages
           playerMsg={this.state.playerMsg}
           pirateMsg={this.state.pirateMsg}
           playerTurnType={player.turnType}
         />
        {
          this.state.exchangeWinner !== null &&
          <EndExchange
            winner={this.state.exchangeWinner}
            turnType={player.turnType}
          />
        }
         <Scroll>
          <Choices
              choices={this.state.choices}
              updateRound={this.updateRound}
          />
        </Scroll>
      </div>
    )
  }
}