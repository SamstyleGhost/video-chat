import React from 'react';
import { Gitlab, GitHub } from 'react-feather';

// The TopBar is only used on the Homepage for now, just contains the logo, name and a link to the github repository
const TopBar = () => {
  return (
    <div className='w-full flex justify-between pb-4 border-b-2 border-white'>
      <div className='flex align-middle'>
        <Gitlab style={{width: '40px', height: '40px'}}/>
        <div className='mx-4 text-5xl'>
          <span>RTChat</span>
        </div>
      </div>
      <div>
        <a href='https://github.com/SamstyleGhost/video-chat' target='_blank' rel='noreferrer'>
          <GitHub style={{width: '40px', height: '40px'}}/>
        </a>
      </div>
    </div>
  )
}

export default TopBar