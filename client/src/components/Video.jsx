import React, { useEffect, useRef } from 'react';

const Video = ({stream, from}) => {

  const ref = useRef();
  useEffect(() => {
    ref.current.srcObject = stream;
  }, [stream])
  
  return (
    <div className='m-4 border-2 border-red-600'>
      <video autoPlay muted ref={ref} width='400px' height='400px'>{from}</video>
    </div>
  )
}

export default Video