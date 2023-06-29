import React, { useState, useEffect } from 'react';

import { verifySignedIn } from '../../Firebase.js';

import Map from '../SharedComponents/Map.jsx';

import axios from 'axios';

const BottomBar = ({ setPage, toysIDCoordsPhoto, setToysIDCoordsPhoto }) => {
  const [map, setMap] = useState(false);

  const fetchToysIDCoordsPhoto = () => {
    axios.get('/toysIDCoordsPhoto')
      .then((apiData) => {
        setToysIDCoordsPhoto(apiData.data);
      })
      .catch((err) => {
        console.log('ERROR fetching toys map info ', err);
      });
  };

  const onAddToyClick = () => {
    const isSignedIn = verifySignedIn();
    if (isSignedIn) {
      setPage(4);
    } else {
      // eslint-disable-next-line no-undef
      alert('Please sign in to add a toy');
    }
  };

  useEffect(fetchToysIDCoordsPhoto, []);

  return (
    <>
      {map ? <div className='w-screen h-screen bg-slate-400/40 top-0 left-0 fixed z-30' onClick={() => { setMap(false); }}></div> : null}
      <div className='fixed bottom-0 bg-white z-10 w-full shadow-md shadow-black rounded-tr-2xl rounded-tl-2xl flex justify-center space-x-14'>
        <button className="active:bg-gray-100 text-black py-3 px-4 rounded-full border border-solid" onClick={onAddToyClick}>
          AddToy
        </button>
        {!map && toysIDCoordsPhoto !== undefined ? <div className='shadow-sm shadow-black rounded-full'><img data-testid='it-map' className='inline-block hover:opacity-30 w-9 h-9 translate-y-2' src='./icons/mapIcon.png' onClick={() => setMap(true)}/></div> : null}
      </div>
      {map ? <Map toysIDCoordsPhoto={toysIDCoordsPhoto}/> : null}
    </>
  );
};

export default BottomBar;
