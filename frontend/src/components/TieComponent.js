import React, { Component } from 'react';

class TieComponent extends Component {

    render() {
        return (
            <div className="Lose">
                <div className="Item">
                    <img src="/src/img/lose.gif" alt="Lose"/>
                    <h3>Its a Tie</h3>
                </div>
            </div>
        )
    }
}
export default TieComponent;
