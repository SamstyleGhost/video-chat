import React, { useState } from 'react';
import { useSocketContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

  const { socket, peerId } = useSocketContext();
  const navigate = useNavigate();

  const [room, setRoom] = useState('');

  const handleCreateRoom = () => {
    socket.emit('create-room');
    socket.on('room-created', (roomId) => {
      navigate(`/${roomId}`)
      socket.emit('join-room', roomId, peerId);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("This is the peer: ", peerId);
    navigate(`/${room}`);
    socket.emit('join-room', room, peerId);
  };

  return (
    <div>
      <button className='border-2 border-black' onClick={handleCreateRoom}>Create Room</button>
      <form onSubmit={handleSubmit}>       
        <input 
          type='text' 
          value={room} 
          placeholder='Enter room' 
          className='border-2 border-black my-2' 
          onChange={(e) => {setRoom(...room, e.target.value)}}
        />
        <button className='border-2 border-black' type='submit'>Join Room</button>
      </form>
    </div>
  )
}

export default Homepage