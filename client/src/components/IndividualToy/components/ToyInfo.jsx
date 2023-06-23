import React from 'react';

const ToyInfo = ({ toy }) => {
  return (
    <div className='w-11/12 pb-36' style={{ transform: 'translateX(5vw)' }}>
      <div data-testid='it-location'>{toy.location}</div>
      <div className='h-0.5 bg-slate-600 w-40 mb-5'></div> {/* Simple line */}
      <div data-testid='it-user' className='btn btn-circle float-right'>{toy.user}</div>
      <div data-testid='it-distance' className='inline-block'>24 miles away</div>
      <img data-testid='it-map' className='w-8 inline-block hover:opacity-30' src='./icons/mapIcon.png'></img>
      <div className='h-0.5 bg-white w-40 mt-5 mb-5'></div> {/* Simple line */}
      <div data-testid='it-description'>{toy.description}</div>
    </div>
  );
};

export default ToyInfo;
