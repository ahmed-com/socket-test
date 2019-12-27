//this will try to make a connection
let socket = io();
/*notice that this socket.on is an event listener from the client side, listening to the server events*/
socket.on('connect',()=>{
    console.log('connected to the server');
});
socket.on('disconnect',()=>{
    console.log('disconnected from the server');
});
socket.on('newMessage',message=> console.log(`message is '${message.content}' from '${message.from}' at ${message.createdAt}`));

// socket.emit('messageCreation',{from:'user',content:'content'});