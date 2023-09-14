import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocketContext } from '../context';
import { Video } from '../components';

const MeetPage = () => {

  const { room } = useParams();
  const { socket,  peer } = useSocketContext();
  const [users, setUsers] = useState({
    peer: peer,
    usersInCurrentRoom: []
  });
  const [mediaStream, setMediaStream] = useState(null);
  const [peers, setPeers] = useState({});
  const [userMediaStream, setUserMediaStream] = useState(null);

  const connectToNewUser = useCallback((userId, stream) => {
    console.log("Connecting to new user");
    const call = peer.call(userId, stream);
    call.on('stream', userVideoStream => {
      setUserMediaStream(userVideoStream);
    });
    call.on('close', () => {
      console.log("user left");
    })
  }, [peer]);

  useEffect(() => {
    socket.emit('request-current-room-users', room);
    socket.on('current-room-users', usersInCurrentRoom => {
      const otherUsersInCurrentRoom = usersInCurrentRoom.filter((user) => {
        return user !== peer.id;
      });
      setUsers((prevState) => {
        return { ...prevState, usersInCurrentRoom: otherUsersInCurrentRoom};
      });
    });
  }, [peer, room, socket])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      // myVideo.current.srcObject = stream;
      setMediaStream(stream);

      console.log("Our stream: ", stream);
      peer.on('call', call => {
        console.log("Peer: ", peer);
        call.answer(stream);
        call.on('stream', userVideoStream => {
          setUserMediaStream(userVideoStream);
        })
      })
      console.log("UserMediaStream: ", userMediaStream);

      socket.on('user-joined-room', (newUserId) => {
        connectToNewUser(newUserId, stream);
      });
    })
  }, [connectToNewUser, peer, socket, userMediaStream])

  useEffect(() => {
    console.log("Peer: ", peer);
  }, [peer])
  

  return (
    <div>
      <div>{room}</div>
      {/* <div><video autoPlay muted ref={myVideo} width='400px' height='400px' className='border-2 border-red-500'></video></div> */}
      <div>
        <Video stream={mediaStream} from='mystream'/>
      </div>
      <div>
        <Video stream={userMediaStream} from='userStream'/>
      </div>
      {users.usersInCurrentRoom.map((user, index) => {
        return (
          <div className='bg-black text-white' key={index}>{index} : {user}</div>
        );
      })}
    </div>
  )
}

export default MeetPage