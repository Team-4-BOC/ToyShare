import React from 'react';

import Map from './Map.jsx';

const ToyInfo = ({ toy, setPage, setMap, map }) => {
  return (
    <div className='pb-24 relative'>
      <div data-testid='it-location' >{toy.location}</div>
      <div className='h-0.5 bg-gray-500  w-40 mb-5'></div> {/* A simple line */}
      <div className='absolute top-0 right-1 shadow-lg shadow-black rounded-md w-16 h-24 bg-gray-900' onClick={() => setPage(3)}>
        <img src={toy.user_photo} data-testid='it-user' className='rounded-full w-16 h-16'/>
        <div className='text-white font-bold text-center'>{toy.user}</div>
      </div>
      <div data-testid='it-distance' className='inline-block'>24 miles away</div>
      {map ? <Map /> : <img data-testid='it-map' className='w-8 inline-block hover:opacity-30' src='./icons/mapIcon.png' onClick={() => setMap(true)}/>}
      <div className='h-0.5 bg-black w-40 mt-5 mb-5'></div>  {/* A simple line */}
      <div data-testid='it-description'>{toy.description}</div>
    </div>
  );
};

export default ToyInfo;
