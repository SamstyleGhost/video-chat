const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*'},
  methods: ['GET', 'POST']
});

const { v4 : uuidV4 } = require('uuid');

const PORT = process.env.PORT || 5000;


// This is the initial connection between the server and the client
io.on('connection', (socket) => { 

  // This is the listener to the event emitted when a user creates a new room on the Homepage
  // Generates a unique id and emits an event with the roomId data passed 
  socket.on('create-room', () => {  
    const roomID = uuidV4();
    socket.emit('room-created', roomID);
  });

  // This is the listener to the event emitted when a user wants to join an existing room
  // Adds the user to the given roomID 
  socket.on('join-room', (roomId) => {

    // The following line adds the current user to the room Id provided 
    socket.join(roomId);
    console.log(socket.id);

    // The following event is emitted to every user in the room except the sender of the 'join-room' event we are currently in
    // The listener for this event is present on the meetpage
    // It sends the sender's socket Id to all the other people in the room
    socket.broadcast.emit('user-joined-room', socket.id);
  })
});

server.listen(PORT)