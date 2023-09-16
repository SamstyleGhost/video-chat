import React, { useEffect, useRef, useState } from 'react';

const Video = ({call}) => {
  
  const ref = useRef();
  const [stream, setStream] = useState(null);

  useEffect(() => {
    call.on('stream', userVideoStream => {
      setStream(userVideoStream);
      ref.current.srcObject = userVideoStream;
    })
  }, [call])
  
  useEffect(() => {
    console.log("User stream: ", stream);
  }, [stream])

  return (
    <div className='m-4 border-2 border-red-600'>
      <video autoPlay muted ref={ref} width='400px' height='400px'></video>
    </div>
  )
}

export default Video