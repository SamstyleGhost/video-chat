import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSocketContext } from '../context';
import { Video } from '../components';

const MeetPage = () => {

  const { room } = useParams();
  const { socket } = useSocketContext();

  useEffect(() => {
    socket.on('user-joined-room', (newUserId) => {
      console.log(newUserId);
    });

    socket.on('current-room-users', usersInCurrentRoom => {
      console.log("Already in room: ",usersInCurrentRoom);
    });
  }, [socket])

  // useEffect(() => {
  //   const stream = navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: true
  //   });

  // }, [])

  return (
    <div>
      {room}
    </div>
  )
}

export default MeetPage