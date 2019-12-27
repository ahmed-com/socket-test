//we do this step so that we don't have to go back every time
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'/../public');
const port =process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection',socket =>{
    console.log('a new user just connected');

    socket.emit('newMessage',{
        from:'Admin',
        content:'welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        content: 'A new user just joind',
        createdAt: new Date().getTime()
    });

    socket.on('messageCreation',message =>{
        console.log('the message created is '+message.content);

        io.emit('newMessage',{
            from: message.from,
            content: message.content,
            createdAt: new Date().getTime()
        });

    });//this is a custom event listener that is listening for a custom event emitted from that socket

    socket.on('disconnect',()=> console.log('user just disconnected'));
});


server.listen(port,()=>{
    console.log(`server is up at port ${port}`)
});