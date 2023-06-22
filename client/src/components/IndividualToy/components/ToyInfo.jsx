import React from 'react';

const ToyInfo = ({ toy }) => {
  return (
    <div>
      <div>{toy.location}</div>
      <div className='btn btn-circle float-right'>{toy.user}</div>
      <div className='inline-block'>24 miles away</div>
      <img className='w-8 inline-block hover:opacity-30' src='./icons/mapIcon.png'></img>
      <div>{toy.description}</div>
    </div>
  );
};

export default ToyInfo;
