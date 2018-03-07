import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Redirect } from 'react-router-dom';

import { socket } from './App'

class StartPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            copied: false,
            gameUrl: ''
        };
    }

    componentDidMount() {
        socket.connect()


        socket.on('connect', () => {
            socket.on('get-link', ({ url }) => {
                this.setState({ value: `${location.origin}/game/${url}` })
            })

            socket.on('start-game', ({ url }) => {
                this.setState({ gameUrl: `game/${url}` })
            })
        })

    }

    render() {
        return (
            <div className="start-page-component">
                {this.state.gameUrl ? (<Redirect to={this.state.gameUrl} />) : (
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
