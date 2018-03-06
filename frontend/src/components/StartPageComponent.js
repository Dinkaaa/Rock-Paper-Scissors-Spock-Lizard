import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import {socket} from './App'

class StartPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            copied: false,
            link: false,
            gameUrl: ''
        };

        this.socket = socket;
        this.socket.on('start_game', (data)=> {
            console.log('start');
            this.setState({gameUrl: data.link})
        });
    }
    componentDidMount() {

        socket.on('getLink', (data) => {

            this.setState({ value: data.link });

            socket.emit('login', {userID : 1, roomID : data.gameId} );
            
        });
        
    }
    render() {
        return (
            <div className="start-page-component">
                {this.state.link ? (<Redirect to={this.state.gameUrl} />) : (
                    <div>
                        <h1 className="text-center">Hello!</h1>
                        <h3 className="text-center">Share this link to start game!</h3>
                        <div className="copy-link-content form-group row col-7 justify-content-around">
                            <input value={this.state.value} className="form-control col-8"
                                onChange={({ target: { value } }) => this.setState({ value, copied: false })} />

                            <CopyToClipboard text={this.state.value}
                                onCopy={() => this.setState({ copied: true })}>
                                <button className="btn btn-primary col-3">Copy Link</button>
                            </CopyToClipboard>

                            {this.state.copied ? <div className="alert alert-primary mt-2 col-12 text-center" role="alert">Link Copied!</div> : null}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
export default StartPageComponent;
