const uuidv1 = require('uuid/v1');
const get = require('lodash/get');
const results = {};

module.exports = (app, io) => {
    io.on('connection', socket => {
        const roomId = uuidv1();//generate the unic id room 
        socket.join(roomId); //add user to room

        socket.on('disconnect', () => {
            socket.leave(roomId); //remove room
        });

        socket.on('login', ({ roomId }) => {

            //if not 1 user in room and room does not exist return error
            if (get(io, `sockets.adapter.rooms.${roomId}.length`) !== 1
                && !get(io, `sockets.adapter.rooms.${roomId}.sockets.${socket.id}`)) {

                socket.emit('game-error');
                return;
            }

            socket.join(roomId);//add user to room
            socket.to(roomId).emit('start-game', { url: roomId })//return start game
        });


        socket.on('make-move', ({ roomId, value }) => {

            //if find movement in room 
            if (results[roomId]) {

                //Check if Tie result
                if (results[roomId] === value) {
                    socket.emit('game-result', { result: 'tie' });
                    socket.to(roomId).emit('game-result', { result: 'tie' });
                } else {
                    const result = isVictory(results[roomId], value); //who win
                    socket.emit('game-result', { result: result ? 'lose' : 'win' });
                    socket.to(roomId).emit('game-result', { result: result ? 'win' : 'lose' });
                }

                delete results[roomId];
                return
            }

            results[roomId] = value; // add movement to room
        })

        socket.emit('get-link', { url: roomId })
    })
}


function isVictory(move1, move2) {

    // object with all variable combination of movements
    // name - value with defeats 'defeats'
    const choices = {
        rock: { name: "Rock", defeats: ["scissors", "lizard"] },
        paper: { name: "Paper", defeats: ["rock", "spock"] },
        scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
        lizard: { name: "Lizard", defeats: ["paper", "spock"] },
        spock: { name: "Spock", defeats: ["scissors", "rock"] }
    };

    // check in 'choices' if 'move1' include in defeats 'move2'
    return choices[move1].defeats.includes(move2)
}