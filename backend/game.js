const uuidv1 = require('uuid/v1');
const get = require('lodash/get');
const results = {};

module.exports = (app, io) => {
    io.on('connection', socket => {
        const roomId = uuidv1();
        socket.join(roomId);

        socket.on('disconnect', () => {
            socket.leave(roomId);
        });

        socket.on('login', ({ roomId }) => {
            if (get(io, `sockets.adapter.rooms.${roomId}.length`) !== 1
                && !get(io, `sockets.adapter.rooms.${roomId}.sockets.${socket.id}`)) {

                socket.emit('game-error');
                return;
            }

            socket.join(roomId);
            socket.to(roomId).emit('start-game', { url: roomId })
        });

        socket.on('make-move', ({ roomId, value }) => {
            if (results[roomId]) {

                if (results[roomId] === value) {
                    socket.emit('game-result', { result: 'tie' });
                    socket.to(roomId).emit('game-result', { result: 'tie' });
                } else {
                    const result = isVictory(results[roomId], value);
                    socket.emit('game-result', { result: result ? 'win' : 'lose' });
                    socket.to(roomId).emit('game-result', { result: result ? 'lose' : 'win' });
                }

                delete results[roomId];
                return
            }

            results[roomId] = value;
        })

        socket.emit('get-link', { url: roomId })
    })
}

function isVictory(move1, move2) {
    const choices = {
        rock: { name: "Rock", defeats: ["scissors", "lizard"] },
        paper: { name: "Paper", defeats: ["rock", "spock"] },
        scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
        lizard: { name: "Lizard", defeats: ["paper", "spock"] },
        spock: { name: "Spock", defeats: ["scissors", "rock"] }
    };

    return choices[move1].defeats.includes(move2)
}