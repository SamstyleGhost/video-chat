import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage, MeetPage } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/:room' element={<MeetPage />} />
    </Routes>
  );
}

export default App;
