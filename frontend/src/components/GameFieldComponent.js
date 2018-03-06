import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import MIDISounds from 'midi-sounds-react';

const variables = [
  {
    value: 'lizard',
    imgSrc: 'src/img/lizard.svg'
  },
  {
    value: 'paper',
    imgSrc: 'src/img/paper.svg'
  },
  {
    value: 'rock',
    imgSrc: 'src/img/rock.svg'
  },
  {
    value: 'scissors',
    imgSrc: 'src/img/scissors.svg'
  },
  {
    value: 'spock',
    imgSrc: 'src/img/spock.svg'
  },
]

const bg = {
  backgroundImage: 'url(src/img/field-bg.svg)',
};

class GameFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: false
    }
  }
  playSound() {
      this.midiSounds.playChordNow(1248, [3], 2);
  }
  onHandleClick(value) {
    console.log(value);
    // var data = value;
    // fetch("<url to where to post>", {
    //   method: "POST",
    //   body: 'data'
    // }).then(this.setState({ fireRedirect: true })) 
    this.setState({ fireRedirect: true })
  }
  componentDidMount(){
    console.log('GameId', this.props.match.params.id);
    console.log('UsersId', this.props.match.params.user);
  }
  render() {
    return (
      <div>
        {this.state.fireRedirect ? (<Redirect to="/end" />) : (
          <div className="game-field-component">
            <div className="game-field" style={{ backgroundImage: 'url(src/img/field-bg.svg)' }}>
              {variables.map((item, index) => {
                return (
                  <div className="game-variable"
                    key={index}
                    id={item.value}
                    onMouseEnter={this.playSound.bind(this)}
                    onClick={this.onHandleClick.bind(this, item.value)}>
                    <img src={item.imgSrc} alt={item.value} />
                    <span>{item.value}</span>
                  </div>
                )
              })}
            </div>
            <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[1248]} />
          </div>)}
      </div>
    )
  }
}
export default GameFieldComponent;
