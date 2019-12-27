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
    socket.on('disconnect',()=> console.log('user just disconnected'));
});//this method is basically an event listener and we here are listening for a connection event


server.listen(port,()=>{
    console.log(`server is up at port ${port}`)
});