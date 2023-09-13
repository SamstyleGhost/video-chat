import React, { createContext, useContext, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { Peer } from 'peerjs'

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {

  const socket = useMemo(() => io('http://localhost:5000'), []);
  const peer =  useMemo(() => new Peer(), []);

  const [peerId, setPeerId] = useState('');

  peer.on('open', id => {
    setPeerId(id);
    // console.log(id);
  })

  return (
    <SocketContext.Provider
      value={{
        socket,
        peerId,
        peer
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => {
  const socket = useContext(SocketContext)
  return socket;
}