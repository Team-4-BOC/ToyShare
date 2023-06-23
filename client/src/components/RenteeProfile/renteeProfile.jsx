import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarCreator from '../SharedComponents/StarCreator.js';

const userInfo = {
  name: 'Burt Macklyn',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/640px-Dwayne_Johnson_2014_%28cropped%29.jpg',
  location: 'Denver, CO',
  rating: '5stars',
  description: 'Loves working on his farm and has a pet alligator',
  inventory: ['T-Rex (full body suit)', '1000pc erector set', 'Remote control airplane']
};

const RenteeProfile = ({ userId, setPage }) => {
  const [renteeData, setRenteeData] = useState({});
  // const [itemsRentedOut, setItemsRentedOut] = useState([]);

  useEffect(() => {
    axios.get('/user', { params: { id: userId } })
      .then((data) => {
        console.log('data', data.data[0]);
        setRenteeData(data.data[0]);
      });
    // axios.get('/toys', { params: { id: userId } })
    //   .then((data) => {
    //     setItemsRentedOut(data.data[0]);
    //   });
  }, []);

  // className="card card-compact w-96 bg-base-100 shadow-xl"
  return (
    <div className="flex items-center flex-col">
      <div>
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
