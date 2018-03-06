var express = require('express');
var cors = require('cors');


var app = express();

//app.use();
app.use(cors());


var io = require('socket.io').listen(app.listen(3000, function(){
    console.log('server start');
}));

require('./game')(app, io);