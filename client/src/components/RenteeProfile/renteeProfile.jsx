import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RenteeInventory from './RenteeInventory.jsx';
import RenteeInfo from './RenteeInfo.jsx';

const RenteeProfile = ({ userId, setPage, toyUserId }) => {
  const [renteeData, setRenteeData] = useState({});

  useEffect(() => {
    axios.get('/renteepf', { params: { id: toyUserId } })
      .then((data) => {
        setRenteeData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!renteeData.user) {
    // return (
    //   <div>
    console.log('Loading......');
    //   </div>
    // );
  } else {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <div className="profile">
          <RenteeInfo renteeData={renteeData}/>
          <br></br>
          <RenteeInventory inventoryData={renteeData.inventory}/>
        </div>
      </div>
    );
  }
};
export default RenteeProfile;
