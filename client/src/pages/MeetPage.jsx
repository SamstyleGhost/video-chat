import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSocketContext } from '../context';

const MeetPage = () => {

  const { room } = useParams();
  const { socket } = useSocketContext();

  useEffect(() => {
    socket.on('user-joined-room', (newUserId) => {
      console.log(newUserId);
    })
  }, [socket])

  return (
    <div>{room}</div>
  )
}

export default MeetPage