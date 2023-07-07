/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, getCurrentUserInfo } from './Firebase.js';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import RenteeProfile from './components/RenteeProfile/renteeProfile.jsx';
import IndividualToy from './components/IndividualToy/IndividualToy.jsx';
import Home from './components/TempHome/Home.jsx';
import EditToy from './components/AddEditToy/EditToy.jsx';
import AddToy from './components/AddEditToy/AddToy.jsx';
import ReserveDates from './components/Checkout/reserveMvp.jsx';
import BookingConfirmation from './components/Checkout/bookingConfirmation.jsx';
import TopBar from './components/TempHome/TopBar.jsx';
import BottomBar from './components/TempHome/BottomBar.jsx';
// import { use } from 'matter';

const App = () => {
  const [userId, setUserId] = useState(3);
  const [userCoords, setUserCoords] = useState();
  const [userEmail, setUserEmail] = useState('');
  console.log('You can do this!!!');
  const email = getCurrentUserInfo();

  const getUserId = (input) => {
    axios
      .get('/userNew', { params: { email: input } })
      .then((data) => {
        // getUserCoords(data.data[0].id);
        setUserId(data.data[0].id);
      })
      .catch((err) => console.log(err));
  };
  getUserId(email);
  console.log('USERID----->', userId);

  const getUserCoords = (id) => {
    axios.get('/userCoordinates', { params: { id } }) // returns 'lat, lng'
      .then((apiData) => {
        setUserCoords(apiData.data);
      })
      .catch((err) => {
        console.log('ERROR fetching coords ', err);
      });
  };

  const [page, setPage] = useState(0);
  const [toyId, setToyId] = useState(1);
  const [toyUserId, setToyUserId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [toysIDCoordsPhoto, setToysIDCoordsPhoto] = useState([]);
  if (page === 0) {
    return (
      <>
        <TopBar
          setPage={setPage}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          userId={userId}
          setUserId={setUserId}
        />
        <br></br>
        <br></br>
        <br></br>
        <Home
          setPage={setPage}
          setToyId={setToyId}
          setToyUserId={setToyUserId}
          searchTerm={searchTerm}
          sort={sort}
          filter={filter}
          userCoords={userCoords}
          toysIDCoordsPhoto={toysIDCoordsPhoto}
          userId={userId}
        />
        <br></br>
        <br></br>
        <BottomBar setPage={setPage} toysIDCoordsPhoto={toysIDCoordsPhoto} setToysIDCoordsPhoto={setToysIDCoordsPhoto} userCoords={userCoords} sort={sort} setSort={setSort} filter={filter} setFilter={setFilter}/>
      </>
    );
  }
  if (page === 1) {
    return (
      <>
        <TopBar setPage={setPage} setUserId={setUserId} userId={userId} />
        <br></br>
        <br></br>
        <IndividualToy setPage={setPage} toyId={toyId} toyUserId={toyUserId} userId={userId} userCoords={userCoords} />
      </>
    );
  }
  if (page === 2) {
    return (
      <>
        <TopBar setPage={setPage} setUserId={setUserId} userId={userId} />
        <br></br>
        <UserProfile userId={userId} setPage={setPage} setToyId={setToyId} />
      </>
    );
  }
  if (page === 3) {
    return (
      <>
        <TopBar setPage={setPage} setUserId={setUserId} userId={userId} />
        <br></br>
        <br></br>
        <RenteeProfile userId={userId} setPage={setPage} toyUserId={toyUserId} />
      </>
    );
  }
  if (page === 4) {
    return (
     <>
       <TopBar setPage={setPage} setUserId={setUserId} userId={userId} />
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <AddToy setPage={setPage} setToyId={setToyId} userId={userId}/>
     </>
    );
  }
  if (page === 5) {
    return (
      <>
        <TopBar setPage={setPage} setUserId={setUserId} userId={userId} />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <EditToy setPage={setPage} toyId={toyId} setToyId={setToyId} toyUserId={toyUserId} userId={userId} />
      </>
    );
  }
  if (page === 6) {
    return (
      <>
        <TopBar setPage={setPage} setUserId={setUserId} userId={userId} />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <ReserveDates setPage={setPage} toyId={toyId} toyUserId={toyUserId} userId={userId} setSelectedDates={setSelectedDates} selectedDates={selectedDates} />
      </>
    );
  }
  if (page === 7) {
    return (
      <>
        <TopBar setPage={setPage} setUserId={setUserId} userId={userId} />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {selectedDates.length > 0 &&
          <BookingConfirmation setPage={setPage} selectedDates={selectedDates} toyId={toyId} toyUserId={toyUserId} userId={userId} />
        }
      </>
    );
  }
}
     
export default App;