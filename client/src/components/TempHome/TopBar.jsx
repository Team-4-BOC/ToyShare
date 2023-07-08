import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
// import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { signInWithGoogle, signOutOfGoogle, verifySignedIn, getCurrentUserInfo } from '../../Firebase.js';
import NotificationDropdown from '../Notifications/NotificationDropdown.jsx';
import axios from 'axios';

const TopBar = ({ setPage, searchTerm, setSearchTerm, userId, setUserId }) => {
  // const getOne = () => {
  //   axios.get('/renteepf', { params: { id: userId } })
  //     .then((data) => {
  //       console.log('data from user from inside homebar', data);
  //     });
  // };
  // const deleteUser = () => {
  //   axios.delete('/deleteUser', { params: { id: 48 } })
  //     .then((data) => {
  //       console.log('data from user from inside homebar', data);
  //     });
  // };

  const [notifications, setNotifications] = useState([]);

  const handleAcessProfileRequest = () => {
    if (!verifySignedIn()) {
      swal({
        title: 'Warning!',
        text: 'Please sign in to view your profile',
        icon: 'warning',
        button: 'OK'
      });
    } else {
      setPage(2);
    }
  };

  const signIn = () => {
    return signInWithGoogle()
      .then((data) => {
        setUserId(data);
        setPage(2);
      })
      .catch((err) => err);
  };

  const signOut = () => {
    return signOutOfGoogle()
      .then((data) => {
        setUserId(0);
        setPage(0);
      })
      .catch((err) => err);
  };

  const getNotifications = () => {
    axios.get('/notifications', { params: { user_id: userId } })
      .then((response) => {
        setNotifications(response.data);
      })
  };

  useEffect(() => {
    getNotifications();
  }, [userId]);

  // eslint-disable-next-line no-unused-vars
  return (
    <div className="fixed navbar bg-primary z-10 w-full shadow-md shadow-black rounded-br-2xl rounded-bl-2xl">
      <div className="flex-1">
        <a
          className="btn btn-ghost normal-case text-xl"
          onClick={() => setPage(0)}
        >
          ToyShare
        </a>
      </div>
      <div style={{ marginRight: '10px' }}>
      <NotificationDropdown notifications={notifications} setNotifications={setNotifications}/>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://t4.ftcdn.net/jpg/02/88/34/27/360_F_288342756_jUPN56JY6vWu7ur7W75bMY7z4x7T9vbi.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between" onClick={handleAcessProfileRequest}>
                Profile
                <span className="badge">Edit</span>
              </a>
            </li>
            <li>
              <a onClick={() => { signIn(); }}>Signin</a>
            </li>
            <li>
              <a onClick={() => { signOut(); }}>Signout</a>
            </li>
            {/* <li><a onClick={() => setPage(3)}>RenteeProfile</a></li> */}
            {/* <li><a onClick={() => { console.log(verifySignedIn()); }}>IsLoggedIn?</a></li>
            <li><a onClick={() => { console.log(getCurrentUserInfo()); }}>getCurrentUserInfo</a></li>
            <li><a onClick={() => { console.log(getOne()); }}>getOne</a></li>
            <li><a onClick={() => { console.log(deleteUser()); }}>deleteUser</a></li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
