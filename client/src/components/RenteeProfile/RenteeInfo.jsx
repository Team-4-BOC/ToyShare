import React from 'react';
import StarCreator from '../SharedComponents/StarCreator.js';

const RenteeInfo = ({ renteeData }) => {
  return (
    <div className="card card-compact w-80 bg-base-80 shadow-xl">
    <img className="object-cover rounded-lg" style={{ width: 330, height: 425 }}src={renteeData.photo} />
    <div className="card-body">
      <h2 className="user-name" style={{ fontSize: 25, fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renteeData.user.first_name} {renteeData.user.last_name}</h2>
      <h2 className="user-location" style={{ fontSize: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renteeData.user.city_state}</h2>
        <div className="user-rating" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {StarCreator(4)}
        </div>
      <p style={{ fontSize: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Proud parent of amazing kids. Check out my inventory of toys for rental!</p>
    </div>
  </div>
  );
};

export default RenteeInfo;
