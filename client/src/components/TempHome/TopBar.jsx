import React, { useState } from 'react';
import swal from 'sweetalert';
// import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { signInWithGoogle, signOutOfGoogle, verifySignedIn, getCurrentUserInfo } from '../../Firebase.js';
import NotificationDropdown from '../Notifications/NotificationDropdown.jsx';

const TopBar = ({ setPage, searchTerm, setSearchTerm, userId, setUserId }) => {
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

  // eslint-disable-next-line no-unused-vars
  const [notifications, setNotifications] = useState(['Josh Man has rented your toy!']);
  const [showNotifs, setShowNotifs] = useState(false);
  const [newNotifs, setNewNotifs] = useState(true);
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
      <NotificationDropdown
        newNotifs={newNotifs}
        setNewNotifs={setNewNotifs}
        showNotifs={showNotifs}
        setShowNotifs={setShowNotifs}
        notifications={notifications} />
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
