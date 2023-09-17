import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSocketContext } from '../context';
import { Video } from '../components';

const MeetPage = () => {

  const { room } = useParams();
  const { socket,  peer } = useSocketContext();
  const [newUser, setNewUser] = useState([]);
  const [calls, setCalls] = useState([]);

  const myVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      myVideo.current.srcObject = stream;

      peer.on('call', call => {
        call.answer(stream);
        setCalls(prevState => [...prevState, call]);
      })
        
      socket.on('user-joined-room', (newUserId) => {
        console.log("Connecting to new user");
        const call = peer.call(newUserId, stream);
        setNewUser(prevState => [...prevState, call]);

        call.on('close', () => {
          console.log("user left");
        })
      });
    })

    return (() => {
      socket.off('current-room-users');
    })
  }, [peer, socket])

  
  return (
    <div>
      <div>{room}</div>
      <div>
      <video autoPlay muted ref={myVideo} width='400px' height='400px'></video>
      </div>
      {calls.map((call, index) => {
        return <Video key={index} call={call}/>
      })}
      {newUser.map((call, index) => {
        return <Video key={index} call={call}/>
      })}
      {newUser.map((user, index) => {
        console.log("New users: ", user.peer);
        return (
          <div className='bg-black text-white' key={index}>{index} : {user.peer}</div>
        );
      })}
    </div>
  )
}

export default MeetPage