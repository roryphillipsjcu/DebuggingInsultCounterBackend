var socket = io.connect("http://144.138.183.34:4500");

socket.on('updateBugCount', function (data) {
    var pElement = document.getElementById("counter");
    pElement.innerHTML = "Count: " + data.bugCount;
});

function onBugButtonPress(){
    socket.emit('bugButtonPress', {});
}