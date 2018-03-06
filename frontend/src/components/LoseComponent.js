import React, { Component } from 'react';

class LoseComponent extends Component {

    render() {
        return (
            <div className="Lose">
                <div className="Item">
                    <img src="src/img/lose.gif" alt="Lose"/>
                    <h3>You Lose =(</h3>
                    <h4>Try Again!</h4>
                </div>
            </div>
        )
    }
}
export default LoseComponent;
