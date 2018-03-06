
import io from 'socket.io-client';
const port = 'http://localhost:3000';
function subscribeToGame(){
    let socket = io.connect(port);
    socket.on('getLink', (data) => {
      this.setState({link: data.link});
    });
}


