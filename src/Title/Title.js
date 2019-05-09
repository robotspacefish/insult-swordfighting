import React, { Component } from 'react'
import './Title.css';

export default class Title extends Component {
  static defaultProps = { modeToSet : 'turnStart'}
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.props.setMode(this.props.modeToSet);
  }

  render() {
    return (
      <div className="Title container">
        <h1>Insult <span>Swordfighting</span></h1>
        <h2>Maecenas sed diam eget risus varius blandit sit amet non magna. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</h2>
        <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum.</p>
        <button className="Title-start-btn" onClick={this.handleClick}>Begin!</button>
      </div>
    )
  }
}
