import React, { useEffect, useRef } from 'react';

const Video = ({stream}) => {

  const ref = useRef();
  
  useEffect(() => {
    ref.current.srcObject = stream;
  }, [stream])
  
  return (
    <div>
      <video autoPlay muted ref={ref} width='400px' height='400px' />
    </div>
  )
}

export default Video