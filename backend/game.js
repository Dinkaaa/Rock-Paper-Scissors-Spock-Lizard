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

            if (data.userID == 1) { //if it is the first player( how sent tke link)
                addRoom(data.roomID);
                addUserToRoom(data.roomID, 1);
            }
            if (data.userID == 2) {
                if(roomIsFull(data.roomID)){
                    client.emit('room_is_full', {resonse: 'Error: room is full'});
                    return false;
                }else{
                    addUserToRoom(data.roomID, 2);
                    client.emit('start_game', { link: clientHost + id + '/1' });
                }
            }else{
                client.emit('user_not_found', {response: 'Error: incorrect user ID'});
                return false;
            }

        });
    });

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