import React from 'react';
import StarCreator from '../SharedComponents/StarCreator.js';

const RenteeInfo = ({ renteeData }) => {
  renteeData.user.introduction = 'Proud parent of amazing kids. Check out my inventory of toys for rental!';
  return (
    <div className="card bg-primary card-compact w-80 bg-base-80 shadow-xl">
    <img data-testid='rentee_photo' className="object-cover rounded-lg" style={{ width: 330, height: 425 }}src={renteeData.photo} />
    <div className="card-body">
      <h2 data-testid="rentee_name" className="user-name" style={{ fontSize: 25, fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renteeData.user.first_name} {renteeData.user.last_name}</h2>
      <h2 data-testid="rentee_location" className="user-location" style={{ fontSize: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renteeData.user.city_state}</h2>
        <div data-testid="rentee_rating" className="user-rating" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {StarCreator(4)}
        </div>
      <p data-testid="rentee_description" style={{ fontSize: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{renteeData.user.introduction}</p>
    </div>
  </div>
  );
};

export default RenteeInfo;
