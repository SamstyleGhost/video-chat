import React, { useEffect, useRef, useState } from 'react';

const Video = ({call}) => {
  
  const ref = useRef();
  const [stream, setStream] = useState(null);

  useEffect(() => {
    call.on('stream', userVideoStream => {
      setStream(userVideoStream);
      // console.log("User stream", userVideoStream);
      ref.current.srcObject = userVideoStream;
    }, err => {
      console.error("Failed to get stream:", err);
    })
  }, [call])
  
  // useEffect(() => {
  //   console.log("User stream: ", stream);
  // }, [stream])

  return (
    <div className='m-4 border-2 border-blue-600 relative'>
      <div className='text-red-600 text-2xl z-10 absolute'>{call.peer}</div>
      <video autoPlay muted ref={ref} width='400px' height='400px'></video>
    </div>
  )
}

export default Video