import React, { useState } from 'react';
import { useSocketContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { TopBar, FormField } from '../components';
import { nasa_earth } from '../assets';

const Homepage = () => {

  const { socket, peerId } = useSocketContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    roomId: ''
  });

  const handleFormFieldChange = (fieldName, value) => {
    setForm({ ...form, [fieldName]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(form.roomId === '') {
      socket.emit('create-room');
      socket.on('room-created', (roomId) => {
        navigate(`/${roomId}`)
        socket.emit('join-room', roomId, peerId);
      });
    } else {
      navigate(`/${form.roomId}`);
      socket.emit('join-room', form.roomId, peerId);
    }

  };

  return (
    <div className='p-8'>
      <div><TopBar /></div>
      <div className='flex flex-col md:flex-row-reverse md:mt-12 my-4'>
        <div className='md:w-1/2 md:px-16 w-full flex flex-col justify-center'>
          <form onSubmit={handleSubmit}>       
            <FormField 
              labelName="Username"
              value={form.username}
              inputType="text"
              onChange={(e) => handleFormFieldChange('username', e.target.value)}
              isRequired
            />
            <FormField 
              labelName="Room"
              value={form.roomId}
              inputType="text"
              onChange={(e) => handleFormFieldChange('roomId', e.target.value)}
            />
            <div className='flex justify-center mt-10'>
              <button className='py-2 px-4 font-semibold bg-primary border border-primary hover:border-accent text-text bg-opacity-80 rounded-md' type='submit'>Create / Join Room</button>
            </div>
          </form>
          <div className='px-4 text-center mt-8'>
            <span className='leading-none text-sm italic'>Enter room id and click button to join room or directly click to create a new room</span>
          </div>
        </div>
        <div className='w-full md:w-1/2 md:my-0 my-10'>
          <img src={nasa_earth} alt='placeholder' className='w-full p-4'/>
          <div className='mt-4 leading-tight'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage