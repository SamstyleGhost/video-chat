import React, { useEffect, useRef } from 'react';

const Video = ({stream}) => {

  const ref = useRef();
  
  useEffect(() => {
    ref.current.srcObject = stream;
  }, [stream])
  
  return (
    <div className='m-4 border-2 border-red-600'>
      <video autoPlay muted ref={ref} width='400px' height='400px' />
    </div>
  )
}

export default Video