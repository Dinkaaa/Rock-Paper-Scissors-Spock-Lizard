import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoseComponent from './LoseComponent';
import TieComponent from './TieComponent';
import WinComponent from './WinComponent';

// object with results and components, which render on this result
const ResultComponentMap = { 
  'tie': TieComponent,
  'win': WinComponent,
  'lose': LoseComponent,
}

class EndRoundComponent extends Component {
  render() {
    const EndComponent = ResultComponentMap[this.props.result]

    return (
      <div>
        <EndComponent />
      </div>
    )
  }
}

export default EndRoundComponent;
