import React from 'react';

const ToyInfo = ({ toy }) => {
  return (
    <div>
      <div>{toy.location}</div>
      <div className='btn btn-circle float-right'>{toy.user}</div>
      <div>24 miles away</div>
      <img src='./icons/mapIcon.png'></img>
      <div>{toy.description}</div>
    </div>
  );
};

export default ToyInfo;
