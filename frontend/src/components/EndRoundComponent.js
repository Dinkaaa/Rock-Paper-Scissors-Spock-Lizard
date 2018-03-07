import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoseComponent from './LoseComponent';
import TieComponent from './TieComponent';
import WinComponent from './WinComponent';

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
        <div className="start-new">
          <Link to='/' className="btn btn-primary">Start new game</Link>
        </div>
      </div>
    )
  }
}

export default EndRoundComponent;
