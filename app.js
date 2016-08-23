var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var cfg = require('./config.json');
var jsf = require('jsonfile');

server.listen(cfg.port, function(){
    console.log(cfg.serverName + " server is listening at port: " + cfg.port);
});

app.use(express.static(__dirname + cfg.staticDirectory));

var persistentData = jsf.readFileSync(__dirname + cfg.dataDirectory + "/savedVariables.json");

io.on('connection', function(socket){
    updateBugCount(socket);

    socket.on('bugButtonPress', function(){
        bugButtonPress();
    });
});

function updateBugCount(socket){
    socket.emit('updateBugCount', {
        bugCount: persistentData.numberBugs
    });
}

function broadcastBugCount(){
    io.sockets.emit('updateBugCount', {
        bugCount: persistentData.numberBugs
    });
}

function bugButtonPress(){
    persistentData.numberBugs += 1;
    broadcastBugCount();

    jsf.writeFile(__dirname + cfg.dataDirectory + "/savedVariables.json", persistentData)
}