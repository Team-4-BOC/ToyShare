import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo.jsx';
import UserToys from './UserToys.jsx';
import UserEdit from './UserEdit.jsx';

// This is the parent component that displays the user profile information and rental details
function UserProfile ({ userId, setPage, setToyId }) {
  const [userData, setUserData] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    axios.get('/userpf', { params: { id: userId } })
      .then((response) => {
        setUserData(response.data);
      });
  };

/*
  const sendNotification = () => {
    axios.post('/notifications', { user_id: userId, toyUserId: 45 })
      .then((response) => {
        console.log('notification sent');
      })
  };

  const getNotifications = () => {
    axios.get('/notifications', { params: {user_id: userId} })
      .then((response) => {
        console.log(response.data);
      })
  };

  const deleteNotifications = () => {
    axios.delete('/notifications', { params: { user_id: userId } })
      .then((response) => {
        console.log(response.data);
      })
  };
*/

  return (
    <div className="h-screen flex items-center justify-center flex-col">
    <div className="profile" style={{ marginTop: '150px' }}>
      {userData && !enableEdit ? <UserInfo userData={userData} setEnableEdit={setEnableEdit}/> : null}
      {enableEdit ? <UserEdit getUserData={getUserData} userData={userData} setEnableEdit={setEnableEdit}/> : null }
      <br></br>
      {userData ? <UserToys setToyId={setToyId} setPage={setPage} userData={userData}/> : null}
      <br></br>
      {/*<button onClick={() => {sendNotification()}}>SEND NOTIFICATION</button>
      <br></br>
      <button onClick={() => {getNotifications()}}>GET NOTIFICATIONS</button>
      <br></br>
  <button onClick={() => {deleteNotifications()}}>DELETE NOTIFICATIONS</button>*/}
    </div>
    </div>
  );
};

export default UserProfile;
