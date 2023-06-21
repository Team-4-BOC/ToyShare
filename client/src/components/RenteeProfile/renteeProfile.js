import React from 'react';
const userInfo = {
  name: 'Burt Macklyn',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/640px-Dwayne_Johnson_2014_%28cropped%29.jpg',
  location: 'Denver, CO',
  rating: '5stars',
  description: 'Loves working on his farm and has a pet alligator',
  inventory: ['T-Rex (full body suit)', '1000pc erector set', 'Remote control airplane']
};
const RenteeProfile = () => {
  return (
    <div>
      <div>
        <div className="rentee">
          <img src={userInfo.photo} alt="The man himself"></img>
          <h2>{userInfo.name}</h2>
          <p>{userInfo.location}</p>
          <div>{userInfo.rating}</div>
        </div>
        <div>
          <p>{userInfo.description}</p>
        </div>
      </div>
      <div>
        <h3>Rental Inventory</h3>
        <p>add/edit toy</p>
        <div>
          <ul>
          {userInfo.inventory.map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default RenteeProfile;
