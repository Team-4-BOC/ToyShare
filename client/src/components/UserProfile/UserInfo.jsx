import React from 'react';
import StarCreator from '../SharedComponents/StarCreator.js';

// This component displays the user profile information as a card
function UserInfo ({ userData, setEnableEdit }) {
  return (
  <div className="card card-compact w-80 bg-base-80 shadow-xl">
    <figure><img src={userData.photo} /></figure>
    <div className="card-body">
      <h2 className="user-name" style={{ fontSize: 25, fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{userData.user.first_name} {userData.user.last_name}</h2>
      <h2 className="user-location" style={{ fontSize: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{userData.user.city_state}</h2>
        <div className="user-rating" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {StarCreator(5)}
        </div>
      <p style={{ fontSize: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Proud parent of amazing kids. Check out my inventory of toys for rental!</p>
      <div className="card-actions justify-end">
      </div>
      <button onClick={() => setEnableEdit(true)} className="btn-sm" style={{ fontSize: 12, textAlign: 'right' }}>Edit Profile</button>
    </div>
  </div>
  );
};

export default UserInfo;
