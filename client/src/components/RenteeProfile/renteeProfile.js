import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const userInfo = {
//   name: 'Burt Macklyn',
//   photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/640px-Dwayne_Johnson_2014_%28cropped%29.jpg',
//   location: 'Denver, CO',
//   rating: '5stars',
//   description: 'Loves working on his farm and has a pet alligator',
//   inventory: ['T-Rex (full body suit)', '1000pc erector set', 'Remote control airplane']
// };

const RenteeProfile = (userId) => {
  const [renteeData, setRenteeData] = useState({});
  const [itemsRentedOut, setItemsRentedOut] = useState([]);

  useEffect(() => {
    axios.get('/user', { params: { id: userId } })
      .then((data) => {
        setRenteeData(data.data[0]);
      });
    axios.get('/toys', { params: { id: userId } })
      .then((data) => {
        setItemsRentedOut(data.data[0]);
      });
  }, []);

  return (
    <div>
      <div>
        <div className="rentee">
          <img src={renteeData.photo} alt="The man himself"></img>
          <h2>{renteeData.name}</h2>
          <p>{renteeData.location}</p>
          <div>{renteeData.rating}</div>
        </div>
        <div>
          <p>{renteeData.description}</p>
        </div>
      </div>
      <div>
        <h3>Rental Inventory</h3>
        <p>add/edit toy</p>
        <div>
          <ul>
          {itemsRentedOut.map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default RenteeProfile;
