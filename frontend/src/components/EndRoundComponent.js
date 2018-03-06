import React, { Component } from 'react';
import LoadingComponent from './LoadingComponent';
import WinComponent from './WinComponent';
import LoseComponent from './LoseComponent';
import {Link} from 'react-router-dom';

class EndRoundComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: true, //wait for results
      win: true // player win? 
    }
  }
  render() {
    return (
      <div>
        {!this.state.results ? (<LoadingComponent />) : (
          <div>
            {(this.state.win) ? (<WinComponent />) : (<LoseComponent />)}
            <div className="start-new">
              <Link to='/' className="btn btn-primary">Start new game</Link>
            </div>
          </div>
        )}

      </div>
    )
  }
}
export default EndRoundComponent;
