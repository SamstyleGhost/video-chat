import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSocketContext } from '../context';
import { Video } from '../components';

const MeetPage = () => {

  const { room } = useParams();
  const { socket,  peer } = useSocketContext();
  const [users, setUsers] = useState({
    peers: [],
    usersInCurrentRoom: []
  });
  const [mediaStream, setMediaStream] = useState(null);
  const [calls, setCalls] = useState([]);
  const [userMediaStream, setUserMediaStream] = useState([]);

  const myVideo = useRef();

  const connectToNewUser = useCallback((userId, stream) => {
    console.log("Connecting to new user");
    const call = peer.call(userId, stream);
    setCalls(prevState => [...prevState, call]);
    // call.on('stream', userVideoStream => {
    //   console.log("User Video Stream", userVideoStream);
    //   setUserMediaStream(...userMediaStream, userVideoStream);
    // });
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
      setMediaStream(stream);
      myVideo.current.srcObject = stream;

      console.log("Our stream: ", stream);
      peer.on('call', call => {
        console.log("Peer: ", peer);
        call.answer(stream);
        // call.on('stream', userVideoStream => {
        //   setUserMediaStream(...userMediaStream, userVideoStream);
        // })
        setCalls(prevState => [...prevState, call]);
      })

      socket.on('user-joined-room', (newUserId) => {
        connectToNewUser(newUserId, stream);
      });
    })
  }, [connectToNewUser, peer, socket, calls])

  useEffect(() => {
    console.log("Calls: ", calls);
    // console.log("USer Media Streams: ", userMediaStream);
    // userMediaStream.map((userStream, index) => {
    //   return console.log("User: ", index, userStream);
    // })
  }, [calls])
  


  return (
    <div>
      <div>{room}</div>
      {/* <div><video autoPlay muted ref={myVideo} width='400px' height='400px' className='border-2 border-red-500'></video></div> */}
      <div>
      <video autoPlay muted ref={myVideo} width='400px' height='400px'></video>
      </div>
      {/* <div>
        <Video stream={userMediaStream[0]} from='userStream'/>
      </div> */}
      {calls.map((call, index) => {
        return <Video key={index} call={call}/>
      })}
      {users.usersInCurrentRoom.map((user, index) => {
        return (
          <div className='bg-black text-white' key={index}>{index} : {user}</div>
        );
      })}
    </div>
  )
}

export default MeetPage