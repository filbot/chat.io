var express = require ("express"); // setup for express app
var app = express (); // assigning express to "app" variable
var port = 3700; // assigning port number

app.set('views', __dirname + '/tpl'); // jade views directory
app.set('view engine', "jade"); // specifying jade as the templating engine
app.engine('jade', require('jade').__express); // setup for jade templating engine
app.get("/", function(req, res) { // route setup using render for jade view
    res.render("page");
});

app.use(express.static(__dirname + '/public')); // ???
var io = require('socket.io').listen(app.listen(port)); // set port for socket.io
console.log("Listening on port " + port); // send to stnd out

// socket.io connection handler
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});