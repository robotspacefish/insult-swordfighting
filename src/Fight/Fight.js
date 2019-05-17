import React, { Component } from 'react'
import Messages from '../Messages/Messages';
import Choices from '../Choices/Choices';
import Scroll from '../Scroll/Scroll';
import allInsults from '../assets/insults.js';
import EndExchange from '../EndExchange/EndExchange';
import FightEnd from '../FightEnd/FightEnd';
import Pirate from '../Pirate';
import { player } from '../Player';

const TIMEOUT_DELAY = 2000;

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
    this.initNextRound = this.initNextRound.bind(this);
    this.props.updateFightCounter();
    this.pirate = new Pirate('comeback', this.props.round);
  }

  componentDidMount() {
    this.setState({ choices : player.updateChoices() })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(player)
  }

  /**
   * @desc Create a new pirate
   * @return {Object} Pirate
   */
  initPirate() {
    return new Pirate('comeback', this.props.round);
  }

  /**
   * @desc initialize everything needed for a new fight round
   */
  initNextRound() {
    this.initPirate();
    this.setState({
      roundWinner : null,
      exchangeWinner : null,
      playerMsg : '',
      pirateMsg : ''
     });

     player.reset();
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

  isFightWon() {
    return player.roundPoints === 2 || this.pirate.roundPoints === 2;
  }

  /**
   * @desc handles the pirate actions and set up of player choices
   * @param {String} choice - user's selected insult or comeback
   */
  updateRound(choice) {
    player.msg = choice;
    this.setState({ playerMsg : player.msg });

    const prevPirateTurnType = this.pirate.turnType;

    if (player.turnType === 'insult') {
      this.pirate.removeInsultSpokenByPlayer(player.msg);
    }

    if (this.pirate.turnType === 'comeback') {
      this.pirate.comeback(player.msg);
    }

    setTimeout(() => {
      this.setState({ pirateMsg : this.pirate.msg });

      let winner = '';

      if (this.isMatch() || player.isNonsenseInsult()) {
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

      if (this.isGameWon()) {
        this.props.updateMode('win');
        return;
      } else if (this.isFightWon()) {
        this.endRound(winner);
        return;
      } else {
        this.setState({ exchangeWinner: winner });
        this.nextExchange();
      }
      this.clearPrevExchangeDisplays();

    }, TIMEOUT_DELAY/2);
  } // end updateRound() ==============================================

  addIfUnknown(type, msg) {
    if (player.knownIC[type].indexOf(msg) === -1) {
      console.log(`learned ${type}: ${msg}`)
      player.knownIC[type] = player.updateKnownIC(type, msg);
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

  isGameWon() {
    const len = allInsults.length;
    // + 2 and + 3 are nonsense insults/comebacks with no pair
    console.log('insults:', player.knownIC.insults.length-2)
    console.log('comebacks:', player.knownIC.comebacks.length-3)
    let res = (player.knownIC.insults.length === len + 2)
      && (player.knownIC.comebacks.length === len + 3)
    return res;
  }

  renderContent() {
    if (this.state.roundWinner !== null) {
      return (<FightEnd
        updateMode={this.props.updateMode}
        winner={this.state.roundWinner}
        initNextRound={this.initNextRound}
        />);
    } else {
      return (
        <div>
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

  render() {
    return (
      <div className="Fight container">
        {this.renderContent()}
      </div>
    )
  }
}