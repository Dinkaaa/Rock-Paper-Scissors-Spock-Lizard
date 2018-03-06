import React, { Component } from 'react';
import LoadingComponent from './LoadingComponent';
import WinComponent from './WinComponent';
import LoseComponent from './LoseComponent';
import TieComponent from './TieComponent';
import { Link } from 'react-router-dom';
import { socket } from './App';
class EndRoundComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: false, //wait for results
      tie: false,
      win: true // player win? 
    }
  }
  componentDidMount() {
    socket.on('game_result', (data) => {

      let result = data.result;

      if (data.gameID == this.props.match.params.id) {

        this.setState({ results: true });

        if (result == 'tie') {

          this.setState({ tie: true });

        } else {

          if (result != this.props.match.params.user) {
            this.setState({ win: false });
          }
        }

      }
    });
  }
  render() {
    return (
      <div>
        {!this.state.results ? (<LoadingComponent />) : (
          <div>
            {this.state.tie ? (<TieComponent />) : (
              <div>
                {(this.state.win) ? (<WinComponent />) : (<LoseComponent />)}
              </div>
            )}

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
