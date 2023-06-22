import React from 'react';

const ToyInfo = ({ toy }) => {
  return (
    <div className='w-11/12' style={{ transform: 'translateX(5vw)' }}>
      <div>{toy.location}</div>
      <div className='h-0.5 bg-slate-600 w-40 mb-5'></div> {/* Simple line */}
      <div className='btn btn-circle float-right'>{toy.user}</div>
      <div className='inline-block'>24 miles away</div>
      <img className='w-8 inline-block hover:opacity-30' src='./icons/mapIcon.png'></img>
      <div className='h-0.5 bg-white w-40 mt-5 mb-5'></div> {/* Simple line */}
      <div>{toy.description}</div>
    </div>
  );
};

export default ToyInfo;
