import React, {useState, useEffect} from 'react';

import tempData from './tempData';

import PhotoCarousel from './components/PhotoCarousel.jsx';
import ToyInfo from './components/ToyInfo.jsx';
import ToyReserve from './components/ToyReserve.jsx';

import StarCreator from '../SharedComponents/StarCreator';

const IndividualToy = ({ testing }) => {
  const [toy, setToy] = useState(tempData);
  return (
    <div className='bg-gray-800 text-white absolute overflow-y-scroll min-h-screen'>
      <div className='flex justify-center space-x-5'>
        <div className='text-lg'>{toy.name}</div>
        {StarCreator(toy.rating)}
      </div>

      <div className='h-0.5 bg-white w-11/12 absolute left-1/2 -translate-x-1/2 -translate-y-1/2'></div> {/* Simple line */}

      <div className='z-10 flex justify-center relative space-x-60 translate-y-10'>
        <div className='btn btn-sm text-xs btn-square bg-gray-900 text-white'>❮</div>
        <button className="btn btn-sm btn-square bg-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="red"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>
      </div>
      <PhotoCarousel toy={toy}/>
      <ToyInfo toy={toy}/>
      <ToyReserve toy={toy}/>
    </div>
  );
};

export default IndividualToy;
