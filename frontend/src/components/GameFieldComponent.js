import MIDISounds           from 'midi-sounds-react';
import React, { Component } from 'react';
import { Redirect }         from 'react-router-dom';
import { socket }           from './App'
import EndRoundComponent    from "./EndRoundComponent";
import LoadingComponent     from "./LoadingComponent";


//images and names movement in game fiels
const variables = [ 
    {
        value: 'lizard',
        imgSrc: '/src/img/lizard.svg'
    },
    {
        value: 'paper',
        imgSrc: '/src/img/paper.svg'
    },
    {
        value: 'rock',
        imgSrc: '/src/img/rock.svg'
    },
    {
        value: 'scissors',
        imgSrc: '/src/img/scissors.svg'
    },
    {
        value: 'spock',
        imgSrc: '/src/img/spock.svg'
    },
]

class GameFieldComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    //play sounds on hover
    playSound() { 
        this.midiSounds.playChordNow(1248, [3], 2);
    }

    //on make move 
    //value  -  value of the selected movement 
    onHandleClick(value) {
        socket.emit('make-move', {value, roomId: this.props.match.params.id})
        this.setState({isMoveMade: true})
    }

    componentDidMount() {

        //if API return error redirect to page not found
        socket.on('game-error', () => {
            this.setState({isError: true})
        })

        //if API return a result of game render 'EndRoundComponent' 
        socket.on('game-result', ({result}) => {
            this.setState({result})
        })

        //if second user open the link, login him in relevant room
        if (socket.connected) {
            return socket.emit('login', {roomId: this.props.match.params.id})
        }

        socket.on('connect', () => {
            socket.emit('login', {roomId: this.props.match.params.id})
        })
    }
    render() {
        return (
            <div>
                {this.state.isError && <Redirect to="/pageNotFound"/>}
                {this.state.isMoveMade && !this.state.result && <LoadingComponent/>}
                {this.state.result && <EndRoundComponent result={this.state.result}/>}
                {
                    !this.state.isMoveMade &&  <div className="game-field-component">
                        <div className="game-field" style={{backgroundImage: 'url(/src/img/field-bg.svg)'}}>
                            {variables.map((item, index) => {
                                return (
                                    <div className="game-variable"
                                         key={index}
                                         id={item.value}
                                         onMouseEnter={this.playSound.bind(this)}
                                         onClick={this.onHandleClick.bind(this, item.value)}>
                                        <img src={item.imgSrc} alt={item.value}/>
                                        <span>{item.value}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[1248]}/>
                    </div>
                }
            </div>
        )
    }
}

export default GameFieldComponent;
