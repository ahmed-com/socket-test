//we do this step so that we don't have to go back every time
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'/../public');
const port =process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection',socket =>{
    console.log('a new user just connected');

    socket.emit('newMessage',generateMessage('Admin','welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','A new user just joind'));

    socket.on('messageCreation',(message,callback) =>{
        console.log('the message created is '+message.content);

        io.emit('newMessage',generateMessage(message.from,message.content));

        callback("got it ");
    });//this is a custom event listener that is listening for a custom event emitted from that socket

    socket.on('createLocationMessage',coords=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.lat,coords.lng));
    });

    socket.on('disconnect',()=> console.log('user just disconnected'));
});


server.listen(port,()=>{
    console.log(`server is up at port ${port}`)
});