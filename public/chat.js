window.onload = function () {

    var messages = [];
    var socket = io.connect('http://filbot-chat.jit.su');
    //for local dev
    // var socket = io.connect('http://localhost:4000');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");


    socket.on('message', function (data) {

        var timeStamp = new Date().getTime();

        var now = timeStamp / 60000000000;

        console.log("the time is " + now);

        if(data.message) {
            messages.push(data.message);
            var html = '';
            for( i = 0; i < messages.length; i++) {
                html += '<div class="message-container animated fadeInUp">';
                html += '<div class="who">' + (messages[i].username ? messages[i].username : '&#128100;') + '</div>';
                html += '<div class="chat">';
                html += '<div class="message">' + messages[i] + '</div>';
                html += '<div class="time">' + ('<span class="clock">&#128340;</span>' + ' 2 min ago') + '</div>';
                html += '</div>';
                html += '</div>';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = function () {
        var text = field.value;
        socket.emit('send', { message: text, username: 'You' });
        field.value = "";
    };

    field.onkeyup = function (e) {
        if(e.keyCode === 13) {
            var text = field.value;
            socket.emit('send', { message: text, username: 'You' });
            field.value = "";
        }
    };

};