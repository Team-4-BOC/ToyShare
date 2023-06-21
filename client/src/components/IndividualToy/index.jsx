import React, {useState, useEffect} from 'react';

import tempData from './tempData';

import PhotoCarousel from './components/PhotoCarousel.jsx';
import ToyInfo from './components/ToyInfo.jsx';
import ToyReserve from './components/ToyReserve.jsx';

const IndividualToy = () => {
  const [toy, setToy] = useState(tempData);
  return (
    <div>
      <div className='flex justify-center space-x-16'>
        <div>{toy.name}</div>
        <div>{toy.rating}</div>
      </div>
      <PhotoCarousel toy={toy}/>
      <ToyInfo/>
      <ToyReserve/>
    </div>
  );
};

export default IndividualToy;
