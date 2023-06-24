import React, { useState, useEffect } from 'react';
import axios from 'axios';

import tempData from './tempData';

import PhotoCarousel from './components/PhotoCarousel.jsx';
import ToyInfo from './components/ToyInfo.jsx';
import ToyReserve from './components/ToyReserve.jsx';

import StarCreator from '../SharedComponents/StarCreator';

// import { getCurrentUserInfo, verifySignedIn } from '../../Firebase.js';

let justSaved = false;

const IndividualToy = ({ testing, setPage, toyId, userId }) => {
  const [toy, setToy] = useState(testing ? tempData : {});
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
    <div className='absolute overflow-y-scroll min-h-screen'>
      <div className='flex justify-center space-x-5 bg-gray-900'>
      <div className='text-lg font-bold text-white' data-testid='it-toy-name'>{toy.name}</div>
        {StarCreator(toy.rating)}
      </div>
      <PhotoCarousel toy={toy} handleSave={handleSave}/>
      <ToyInfo toy={toy} setPage={setPage}/>
      <ToyReserve toy={toy} setPage={setPage}/>
    </div>
  );
};

export default IndividualToy;
