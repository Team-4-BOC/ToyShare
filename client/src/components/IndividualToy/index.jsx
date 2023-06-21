import React from 'react';

import tempData from './tempData';

import PhotoCarousel from './components/PhotoCarousel';
import ToyInfo from './components/ToyInfo';
import ToyReserve from './components/ToyReserve';

const IndividualToy = () => {
  return (
    <div>
      Hello world!
      <PhotoCarousel/>
      <ToyInfo/>
      <ToyReserve/>
    </div>
  );
};

export default IndividualToy;
