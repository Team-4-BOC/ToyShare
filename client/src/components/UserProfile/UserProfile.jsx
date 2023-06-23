import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo.jsx';
import UserToys from './UserToys.jsx';

function UserProfile () {
  const [userData, setUserData] = useState(
    {
      user: {
        id: 0,
        first_name: 'init',
        last_name: 'init',
        email: 'init',
        signed_in: false,
        city_state: 'init'
      },
      inventory: [],
      history: [],
      saved: []
    });

  useEffect(() => {
    axios.get('/userpf', { params: { id: 1 } })
      .then((response) => {
        setUserData(response.data);
      });
  }, []);

  return (
    <div className="profile">
      <UserInfo userData={userData}/>
      <UserToys userData={userData}/>
    </div>
  );
};

export default UserProfile;
