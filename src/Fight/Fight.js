import React, { Component } from 'react'
import Messages from '../Messages/Messages';
import Choices from '../Choices/Choices';
import Inventory from '../Inventory/Inventory';
import Scroll from '../Scroll/Scroll';
import allInsults from '../assets/insults.js';
import EndExchange from '../EndExchange/EndExchange';
import FightEnd from '../FightEnd/FightEnd';
import Pirate from '../Pirate';
import { player } from '../Player';
import { delay } from '../helpers';
import './Fight.css';

const TIMEOUT_DELAY = 3000;

export default class Fight extends Component {
  /**
   *
   * @param {Object} props - properties passed from Game component
   * {String} exchangeWinner - who wins each exchange ('player' or 'pirate')
   * {String} roundWinner - who wins each round ('player' or 'pirate')
   * {Array} choices - the player's insults or comebacks to choose from
   * {String} playerMsg - the player's chosen insult or comeback
   * {String} pirateMsg - the pirate's randomly selected insult or comeback
   */
  constructor(props) {
    super(props);
    this.state = {
      exchangeWinner: null,
      roundWinner : null,
      choices: [],
      playerMsg: '',
      pirateMsg: ''
    };

    this.updateRound = this.updateRound.bind(this);
    this.initNextRound = this.initNextRound.bind(this);
    this.updatePlayerChoices = this.updatePlayerChoices.bind(this);
    this.clearPrevExchangeDisplays = this.clearPrevExchangeDisplays.bind(this);
    this.props.updateFightCounter();
    this.pirate = new Pirate(this.props.round);
  }

  componentDidMount() {
    this.updatePlayerChoices();
  }

  componentDidUpdate(prevProps, prevState) {
  }

  /**
   * @desc Create a new pirate
   * @return {Object} Pirate
   */
  initPirate() {
    return new Pirate(this.props.round);
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
    const matched = allInsults.filter(i => {
      return i[player.turnType] === player.msg && i[this.pirate.turnType] === this.pirate.msg;
    });
    return matched.length > 0;
  }


  /**
   * @desc Set the player's choices in state
   */
  updatePlayerChoices() {
    this.setState({ choices: player.updateChoices() });
  }

  /**
   * @desc Clear the messages, previous player choices, and exchange
   * winner in state
   */
  clearPrevExchangeDisplays() {
    // TODO: BUG when a comeback is correct, the response appears above the insult
    // clear messages and choices
      console.log('clearPrevExchangeDisplays')
      const pirateMsg = player.turnType === 'comeback' ? this.pirate.msg : '';
      this.setState({
        pirateMsg: pirateMsg,
        playerMsg: '',
        choices: [],
        exchangeWinner: null
      })
  }

  /**
   * @desc checks to see if either the player or pirate have 2 points
   * @return {Boolean}
   */
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

    delay(() => {
      this.setState({ pirateMsg : this.pirate.msg });

      let winner = '';

      if (this.isMatch() || player.isNonsenseInsult()) {
        console.log('draw, swap turn types')
        winner = 'draw';
        this.swapTurnTypes();
        player.roundPoints = 0;
        this.pirate.roundPoints = 0;
      } else {
        if (player.turnType === 'insult') {
          console.log('player wins')
          winner = 'player';
          player.roundPoints++;
        } else {
          console.log('pirate wins')
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

        // set up next exchange
        this.pirate.turnType === 'insult' && this.pirate.insult();
        delay(this.updatePlayerChoices, TIMEOUT_DELAY * 1.3);
        delay(this.clearPrevExchangeDisplays, TIMEOUT_DELAY / 2)
      }
    }, TIMEOUT_DELAY/2);
  } // end updateRound() ==============================================

  /**
   * @desc if the insult/comeback is new to the player's list, run addIfUnknown to add it
   * @param {String} type 'insult' or 'comeback'
   */
  addICToKnown(type) {
    if (type === 'comeback' && this.pirate.matchedComeback) {
      this.addIfUnknown('comebacks', this.pirate.msg);
    }
    if (type === 'insult') {
      this.addIfUnknown('insults', this.pirate.msg);
    }
  }

  /**
   * @desc Add the new insult/comeback to the player's known insults/comebacks
   * @param {String} type - 'insult' or 'comeback'
   * @param {String} msg  - the insult or comeback to add
   */
  addIfUnknown(type, msg) {
    if (player.knownIC[type].indexOf(msg) === -1) {
      console.log(`learned ${type}: ${msg}`)
      player.knownIC[type] = player.updateKnownIC(type, msg);
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

  /**
   * @desc Set the round winner in state
   * @param {String} winner - 'player' or 'pirate'
   */
  endRound(winner) {
    console.log('endRound')
    this.setState({ roundWinner : winner })
  }

  /**
   * @desc check if the player's list of insults/comebacks contains all
   * of the possible choices, aside from the nonsense choices
   * @return {Boolean}
   */
  isGameWon() {
    const len = allInsults.length;
    // + 2 and + 3 are nonsense insults/comebacks with no pair
    let res = (player.knownIC.insults.length === len + 2)
      && (player.knownIC.comebacks.length === len + 3)
    return res;
  }

  /**
   * @desc render Fight content or FightEnd
   * @return {Object} FightEnd component
   * @return div containing Fight content
   */
  renderContent() {
    const gridStyles =
      this.state.exchangeWinner !== null ?
      {
        gridTemplateAreas:
          "'messages messages' 'end-exchange end-exchange' 'scroll-messages inventory'"
      }
      :
        {
          gridTemplateAreas:
            "'messages messages' 'scroll-messages inventory'"
        }
      ;

    if (this.state.roundWinner !== null) {
      return (<FightEnd
        updateMode={this.props.updateMode}
        winner={this.state.roundWinner}
        initNextRound={this.initNextRound}
        />);
    } else {
      return (
        <div className="Fight-content" style={gridStyles}>
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
          <Inventory
            toggleInventory={this.props.toggleInventory}
            allInsults={allInsults}
            knownIC={player.knownIC}
          />
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