import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarCreator from '../SharedComponents/StarCreator.js';

const userInfo = {
  name: 'Burt Macklyn',
  photo: 'https://pbs.twimg.com/profile_images/1573101768707219456/rOi41vHE_400x400.jpg',
  location: 'Denver, CO',
  rating: '5stars',
  description: 'Loves working on his farm and has a pet alligator',
  inventory: ['T-Rex (full body suit)', '1000pc erector set', 'Remote control airplane', '6x6 red cotton  blanky']
};

const RenteeProfile = ({ userId, setPage }) => {
  const [renteeData, setRenteeData] = useState({});
  // const [itemsRentedOut, setItemsRentedOut] = useState([]);

  useEffect(() => {
    axios.get('/userpf', { params: { id: userId } })
      .then((data) => {
        console.log('data', data.data[0]);
        setRenteeData(data.data[0]);
      });
    // axios.get('/toys', { params: { id: userId } })
    //   .then((data) => {
    //     setItemsRentedOut(data.data[0]);
    //   });
  }, []);

  return (
    <div className="flex items-center flex-col">
      <div className="card-body">
        <div>
          <div>
            <img src={userInfo.photo} alt="The man himself"></img>
          </div>
          <h2>{renteeData.first_name + ' ' + renteeData.last_name}</h2>
          <p>{renteeData.city_state}</p>
          <div>{StarCreator(3)}</div>
        </div>
        <div>
          <p>{userInfo.description}</p>
        </div>
      </div>
      <div>
        <ul className="menu bg-base-200 w-56 rounded-box">
          <li>
            <h2 className="rental-inventory">Rental Inventory</h2>
            <ul>
              {userInfo.inventory.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default RenteeProfile;
