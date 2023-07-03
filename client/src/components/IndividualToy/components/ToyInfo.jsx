import React, { useState, useEffect } from 'react';

import Map from '../../SharedComponents/Map.jsx';

import getDistance from '../../SharedComponents/getDistance.js';

const ToyInfo = ({ toy, setPage, setMap, map, userCoords }) => {
  const [distance, setDistance] = useState();

  useEffect(() => { if (userCoords !== undefined && toy.latlng !== undefined) { setDistance(getDistance(userCoords, toy.latlng)); } }, [userCoords]);

  return (
    <div className='pb-24 relative'>
      <div data-testid='it-location' >{toy.location}</div>
      <div className='h-0.5 bg-gray-500  w-40 mb-5'></div> {/* A simple line */}
      <div className='absolute top-0 right-1 shadow-lg shadow-black rounded-md w-16 h-24 bg-gray-900' onClick={() => setPage(3)}>
        <img src={toy.user_photo} data-testid='it-user' className='rounded-full w-16 h-16'/>
        <div className='text-white font-bold text-center'>{toy.user}</div>
      </div>
      {distance !== undefined ? <div data-testid='it-distance' className='inline-block'>{distance > 0 ? distance + ' miles away' : 'Close by'}</div> : <div>Add location to see distance</div>}
      {map ? <Map latLng={toy.latlng} iconImage={toy.photos[0]}/> : <img data-testid='it-map' className='w-8 inline-block hover:opacity-30' src='./icons/mapIcon.png' onClick={() => setMap(true)}/>}
      <div className='h-0.5 bg-black w-40 mt-5 mb-5'></div>  {/* A simple line */}
      <div data-testid='it-description'>{toy.description}</div>
    </div>
  );
};

export default ToyInfo;
