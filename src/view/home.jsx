import React from 'react';
import Navbar from '../components/navbar';
import Profiles from '../components/profiles';

function Home() {
  return (
    <div className='flex flex-col'>
        <Navbar />
        <Profiles />

    </div>
  )
}

export default Home