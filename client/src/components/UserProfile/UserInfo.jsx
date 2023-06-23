import React, { useState, useEffect } from 'react';

function UserInfo ({ userData }) {
  console.log(userData)
  return (
    <div className="card card-compact w-80 bg-base-80 shadow-xl">
    <figure><img src={userData.photo} /></figure>
    <div className="card-body">
      <h2 className="user-name">{userData.user.first_name} {userData.user.last_name}</h2>
      <h2 className="user-location">{userData.user.city_state}</h2>
      <p>Proud parent of amazing kids. Check out my inventory of toys for rental!</p>
      <div className="card-actions justify-end">
      </div>
    </div>
  </div>
  );
};

export default UserInfo;
