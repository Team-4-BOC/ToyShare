import React from 'react';
import { signInWithGoogle, signOutOfGoogle, verifySignedIn, getCurrentUserInfo } from '../../Firebase.js';

const Home = ({ setPage, searchTerm, setSearchTerm }) => {
  return (
    <div className="navbar bg-base-100 border-solid">
      <div className="flex-1">
        <a
          className="btn btn-ghost normal-case text-xl"
          onClick={() => setPage(0)}
        >
          ToyShare
        </a>
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
              <a className="justify-between" onClick={() => setPage(2)}>
                Profile
                <span className="badge">Edit</span>
              </a>
            </li>
            <li>
              <a onClick={() => signInWithGoogle(setPage)}>Login</a>
            </li>
            <li>
              <a onClick={() => { signOutOfGoogle(); setPage(0); }}>Logout</a>
            </li>
            {/* <li><a onClick={() => setPage(3)}>RenteeProfile</a></li> */}
            <li><a onClick={() => { console.log(verifySignedIn()); }}>IsLoggedIn?</a></li>
            <li><a onClick={() => { console.log(getCurrentUserInfo()); }}>getCurrentUserInfo</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
