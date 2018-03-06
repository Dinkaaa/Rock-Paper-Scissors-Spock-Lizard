const uuidv1 = require('uuid/v1');

const clientHost = 'http://localhost:8080/game/'
module.exports = function (app, io) {
    var rooms = []; //rooms: {id, user1,user2};


    var game = io.on('connection', function (client) {

        var id = uuidv1();

        client.emit('getLink', { link: clientHost + id + '/2' }, function(){
            addRoom(id);
            console.log(rooms)
        });
    });

    function addRoom(roomID) {
        room = new Object();
        room.id = roomID;
        rooms.push(room);
    }

    function removeRoom(roomID) {
        for (i = 0; i < rooms.length; i++) {
            room = rooms[i];
            if (room.id == roomID) {
                rooms.splice(i);
            }
        }
    }

    function destroyRoomOnEmpty(roomID) {
        for (i = 0; i < rooms.length; i++) {
            room = rooms[i];
            if (room.id == roomID) {
                rooms.splice(i);
                return true;
            }
        }
        return false;
    }

    function isRoomFull(roomID) {//2 users in room
        room = getRoomByID(roomID);
        if (!room) {
            return false;
        }
        users = getClientsByRoom(roomID);
        return (users == 2);
    }

    function getRoomByID(roomID) {
        for (i = 0; i < rooms.length; i++) {
            room = rooms[i];
            if (room.id == roomID) {
                return room;
            }
        }
        return null;
    }

    function isRoomEmpty(roomID) {//0 users in room
        return (getClientsByRoom(roomID).length == 0);
    }

    function roomExists(roomID) {//exict room
        return (getRoomByID(roomID) != null);
    }
}