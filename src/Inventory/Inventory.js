import React, { Component } from 'react';
import Pair from '../Pair/Pair';
import './Inventory.css';

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInventory : false,
      inventory : this.setInventory()
    };
    this.handleToggleInventory = this.handleToggleInventory.bind(this);
  }

  handleToggleInventory() {
    this.setState(st => ({ showInventory: !st.showInstructions }));
  }

  setInventory() {
    const insults = [...this.props.knownIC.insults].slice(0, this.props.knownIC.insults.length - 2);
    const comebacks = [...this.props.knownIC.comebacks].slice(0, this.props.knownIC.comebacks.length - 3);

    const inventory = [];

    this.props.allInsults.forEach((pair, index)=> {
      // debugger
      let insult = '';
      let comeback = '';
      if (insults.indexOf(pair.insult) !== -1) {
        insult = pair.insult;
      }
      if (comebacks.indexOf(pair.comeback) !== -1) {
        comeback = pair.comeback;
      }

      if (insult !== '' || comeback !== '' ) {
        inventory.push({ insult, comeback })
      }
    });

    return inventory;
  }

  getTotalPairs() {
    const pairs = this.state.inventory.filter(pair => {
      return pair.insult !== '' && pair.comeback !== '';
    })

    return pairs.length;
  }

  render() {
    return (
      <div className="Inventory container">
        <button id="Inventory-visibility-btn">Known Insults &amp; Comebacks<span><i className="fas fa-angle-down"></i></span></button>
        <p className="Inventory-total-pairs">{this.getTotalPairs()} / 16 Pairs Known</p>
        <ul className="Inventory-content">
          {
            this.state.inventory.map((pair, i) => <Pair  pair={pair} key={i} />)
          }
        </ul>
      </div>
    )
  }
}
