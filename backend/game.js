const uuidv1 = require('uuid/v1');

const clientHost = 'http://localhost:8080/game/'
module.exports = function (app, io) {
    var rooms = []; //rooms: {id, user1,user2};

    var count = 0;
    var game = io.on('connection', function (client) {

        console.log('Users now: ', ++count);

        client.on('disconnect', function () {
            // client.broadcast.to(this.roomID).emit("part", { "reason": "user disconnected" });
            // client.leave(this.roomID);
            // destroyRoomOnEmpty(client.roomID);
            console.log('Users now: ', --count);
        });
        var id = uuidv1();

        client.emit('getLink', { link: clientHost + id + '/2', gameId: id });

        client.on("login", function (data) {

            client.userID = data.userID;
            client.roomID = data.roomID;

            if (data.userID == 1) { //if it is the first player( how sent the link)
                addRoom(data.roomID);
                addUserToRoom(data.roomID, 1);
            }
            if (data.userID == 2) {//player how open the link
                if (roomIsFull(data.roomID)) {
                    client.emit('room_is_full', { resonse: 'Error: room is full' });
                    return false;
                } else {
                    addUserToRoom(data.roomID, 2);
                    client.emit('start_game', { link: clientHost + id + '/1' });
                }
            } else {
                client.emit('user_not_found', { response: 'Error: incorrect user ID' });
                return false;
            }

        });

        client.on('player_move', function (data) {
            var currentRoom = findRoom(data.gameID);
            rooms[currentRoom].users[data.userID - 1].move = data.value;
            client.emit('move_success', { response: true });
            if (checkMakedMoves(currentRoom)) {
                var users = rooms[currentRoom].users;
                var result = gameResults(users[0], users[1]);
                client.emit('game_result', { gameID: data.gameID, result: result });
            }

        });
    });

    function checkMakedMoves(room) { // check of two players maked a move
        var users = rooms[room].users;
        if (users[0].move == '' || users[1].move == '') {
            return false;
        } else {
            return true;
        }
    }
    function gameResults(user1, user2) {
        var choices = {
            rock: { name: "Rock", defeats: ["scissors", "lizard"] },
            paper: { name: "Paper", defeats: ["rock", "spock"] },
            scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
            lizard: { name: "Lizard", defeats: ["paper", "spock"] },
            spock: { name: "Spock", defeats: ["scissors", "rock"] }
        };

        if (user1.move == user2.move) {
            return 'tie';
        } else {
            user1.move = choices[user1.move];

            var victory = user1.move.defeats.indexOf(user2.move) > -1;

            if (victory) {
                return 1;
            } else {
                return 2;
            }
        }


    }
    function addRoom(roomID) {
        room = new Object();
        room.id = roomID;
        room.users = [];
        rooms.push(room);
    }

    function addUserToRoom(roomID, userID) {
        var newUser = {
            id: userID,
            move: ''
        };
        var roomNumber = findRoom(roomID);
        rooms[roomNumber].users.push(newUser);
        console.log(rooms);
    }

    function findRoom(roomID) {
        for (i = 0; i < rooms.length; i++) {
            if (rooms[i].id == roomID) {
                return i;
            }
        }
    }

    function roomIsFull(roomID) {
        if (rooms[findRoom(roomID)].users.length >= 2) {
            return true
        }
    }

}