import React, { Component } from 'react';

class WinComponent extends Component {

    render() {
        return (
            <div className="Lose">
                <div className="Item">
                <img src="/src/img/epic_win.gif" alt="Win"/>
                    <h3>You Win!</h3>
                </div>
            </div>
        )
    }
}
export default WinComponent;
