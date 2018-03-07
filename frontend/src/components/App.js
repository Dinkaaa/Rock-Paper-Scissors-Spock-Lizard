import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, browserHistory } from 'react-router-dom';
import io from 'socket.io-client';

import StartPageComponent from './StartPageComponent';
import GameFieldComponent from './GameFieldComponent';
import EndRoundComponent from './EndRoundComponent';

const url = 'http://localhost:3000'; //api address
export let socket = io(url); // new socket

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse bd-pageheader">
          <h1 className="navbar-brand mb-0">Rock-Paper-Scissors-Spock-Lizard</h1>
        </nav>
        <BrowserRouter history={browserHistory} >
          <Switch>
            <Route exact path='/' component={StartPageComponent} />
            <Route path='/game/:id' component={GameFieldComponent} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;
