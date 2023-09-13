import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocketContext } from '../context';
import { Video } from '../components';

const MeetPage = () => {

  const { room } = useParams();
  const { socket, peerId } = useSocketContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('user-joined-room', (newUserId) => {
      console.log("new User id: ",newUserId);
    });
  }, [socket])

  useEffect(() => {
    socket.emit('request-current-room-users', room, peerId);
    socket.on('current-room-users', usersInCurrentRoom => {
      setUsers(usersInCurrentRoom)
    });
  }, [peerId, room, socket])

  // useEffect(() => {
  //   const stream = navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: true
  //   });

  // }, [])

  return (
    <div>
      <div>{room}</div>
      {users.map((user, index) => {
        return (
          <div key={index}>{index} : {user}</div>
        );
      })}
    </div>
  )
}

export default MeetPage