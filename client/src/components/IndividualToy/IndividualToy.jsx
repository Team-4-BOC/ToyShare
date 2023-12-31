import React, { useState, useEffect } from 'react';
import axios from 'axios';

import tempData from './tempData';

import PhotoCarousel from './components/PhotoCarousel.jsx';
import ToyInfo from './components/ToyInfo.jsx';
import ToyReserve from './components/ToyReserve.jsx';

import StarCreator from '../SharedComponents/StarCreator';

// import { getCurrentUserInfo, verifySignedIn } from '../../Firebase.js';

let justSaved = false;

const IndividualToy = ({ testing, setPage, toyId, userId, userCoords }) => {
  const [map, setMap] = useState(false);
  const [toy, setToy] = useState(testing ? tempData : {});
  const [desktopMode, setDesktopMode] = useState(false);
  useEffect(() => {
    const updateDesktopMode = () => {
      setDesktopMode(window.innerWidth > window.innerHeight);
    };

    window.addEventListener('resize', updateDesktopMode);
    updateDesktopMode();

    return () => {
      window.removeEventListener('resize', updateDesktopMode);
    };
  }, []);

  const fetchToy = () => {
    justSaved = false;
    axios.get('toy', { params: { toyId, userId } })
      .then((apiResults) => {
        setToy(apiResults.data);
      })
      .catch((err) => {
        console.log('EROR fetching toy: ', err);
      });
  };

  useEffect(() => { if (userId !== undefined) { fetchToy(); } }, [userId]); // On user id

  const handleSave = () => {
    if (toy.saved || justSaved) {
      return;
    }
    justSaved = true;
    const modifiedToy = JSON.parse(JSON.stringify(toy));
    modifiedToy.saved = true;
    setToy(modifiedToy);
    // if (!verifySignedIn()) {
    //   alert('I will bring you to login page!');
    //   console.log('Not logged in');
    //   return;
    // }

    axios.post('saved', { toyId, userId })
      .then(() => {
        console.log('Succesful save');
      })
      .catch((err) => {
        console.log('ERROR saving toy: ', err);
      });
  };

  return (
    <div className='relative overflow-y-scroll min-h-screen'>
      {map ? <div className='w-screen h-screen bg-slate-400/40 absolute top-0 left-0 z-20' onClick={() => setMap(false)}></div> : null}
      {toy.name
        ? <>
        <div className={`card bg-base-100 shadow-xl mt-5 w-screen shadow-black ${desktopMode ? 'max-w-[200px] mx-auto' : ''}`}>
          <div className='flex space-x-5 justify-center bg-gray-900 rounded-tl-lg rounded-tr-lg'>
            <div className='card-title text-lg text-white' data-testid='it-toy-name'>{toy.name}</div>
              {StarCreator(toy.rating)}
            </div>
            <PhotoCarousel toy={toy} handleSave={handleSave} setPage={setPage} desktopMode={desktopMode}/>
            <div className='card-body'>
              <ToyInfo toy={toy} setPage={setPage} map={map} setMap={setMap} userCoords={userCoords} desktopMode={desktopMode}/>
            </div>
        </div>
        <div className='card-actions justify-end'></div>
        <ToyReserve toy={toy} setPage={setPage} desktopMode={desktopMode}/>
      </>
        : null}
    </div>
  );
};

export default IndividualToy;
