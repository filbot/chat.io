var express = require ('express'); // setup for express app
var app = express();
var server = require ('http').createServer(app);
var io = require ('socket.io').listen(server); // setup for socket.io

server.listen(80);

app.set('views', __dirname + '/tpl'); // jade views directory
app.set('view engine', "jade"); // specifying jade as the templating engine
app.engine('jade', require('jade').__express); // setup for jade templating engine
app.get("/", function(req, res) { // route setup using render for jade view
    res.render("page");
});

app.use(express.static(__dirname + '/public')); // ???

// socket.io connection handler
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to chat.io' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});