// const moment = require("moment");

//this will try to make a connection
let socket = io();
/*notice that this socket.on is an event listener from the client side, listening to the server events*/
socket.on('connect',()=>{
    console.log('connected to the server');
});
socket.on('disconnect',()=>{
    console.log('disconnected from the server');
});
socket.on('newMessage',message=> {
    let formattedTime = moment(message.createdAt).format('LT');
    let li = document.createElement('li');
    li.innerText = `${message.from} ${formattedTime} : ${message.content}`;
    document.querySelector('body').appendChild(li);
});
socket.on('newLocationMessage',message=> {
    let formattedTime = moment(message.createdAt).format('LT');
    let li = document.createElement('li');
    li.innerText = `${message.from} ${formattedTime} : `;
    let a = document.createElement('a');
    a.setAttribute('target','_blank');
    a.setAttribute('href',message.url);
    a.innerHTML = 'my current location';
    li.appendChild(a);
    document.querySelector('body').appendChild(li);
});

document.querySelector('#submit-btn').addEventListener('click',e=>{
    e.preventDefault();
    socket.emit('messageCreation',{
        from:'user',
        content:document.querySelector('#message').value
    },()=>{});
});

document.querySelector('#send-location').addEventListener('click',e=>{
     if(!navigator.geolocation){
         return alert('geolocation is not supported by your browser')
     }
     navigator.geolocation.getCurrentPosition(position=>{
        socket.emit('createLocationMessage',{
            lat:position.coords.latitude,
            lng:position.coords.longitude
        });
     },()=> alert('unable to get your location'));
});

// socket.emit('messageCreation',{from:'user',content:'content'});