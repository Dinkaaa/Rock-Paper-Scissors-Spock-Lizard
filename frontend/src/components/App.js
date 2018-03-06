import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, browserHistory } from 'react-router-dom';
import io from 'socket.io-client';

import StartPageComponent from './StartPageComponent';
import GameFieldComponent from './GameFieldComponent';
import EndRoundComponent from './EndRoundComponent';

const port = 'http://localhost:3000';
export let socket = io.connect(port);

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse bd-pageheader">
          <h1 className="navbar-brand mb-0">Rock-Paper-Scissors-Spock-Lizard</h1>
        </nav>
        <BrowserRouter history={browserHistory} >
          <Switch>
            <Route exact path='/' component={StartPageComponent} />
            <Route path='/game/:id/:user' component={GameFieldComponent} />
            <Route path='/end/:id/:user' component={EndRoundComponent} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;
