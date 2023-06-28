import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import RenteeProfile from './components/RenteeProfile/renteeProfile.jsx';
import IndividualToy from './components/IndividualToy/IndividualToy.jsx';
import Home from './components/TempHome/Home.jsx';
import EditToy from './components/AddEditToy/EditToy.jsx';
import AddToy from './components/AddEditToy/AddToy.jsx';
import ReserveDates from './components/Checkout/reserveMvp.jsx';
import BookingConfirmation from './components/Checkout/bookingConfirmation.js';
import TopBar from './components/TempHome/TopBar.jsx';
import BottomBar from './components/TempHome/BottomBar.jsx';
// import { use } from 'matter';
// import { getCurrentUserInfo } from './Firebase.js';

const App = () => {
  const [userId, setUserId] = useState(0);
  const [userCoords, setUserCoords] = useState();
  const getUserId = () => {
    // const userInfo = getCurrentUserInfo();
    axios
      .get('/userNew', { params: { email: 'JoshMan@email.com' } })
      .then((data) => {
        getUserCoords(data.data[0].id);
        setUserId(data.data[0].id);
      })
      .catch((err) => console.log(err));
  };
  const getUserCoords = (id) => {
    axios.get('/userCoordinates', { params: { id } }) // returns 'lat, lng'
      .then((apiData) => {
        setUserCoords(apiData.data);
      })
      .catch((err) => {
        console.log('ERROR fetching coords ', err);
      });
  };
  useEffect(() => {
    getUserId();
  }, []);

  // 0 === homepage
  // 1 === individual toy page
  // 2 === user profile
  // 3 === rentee profile
  // 4 === add a toy
  // 5 == edit a toy
  // 6 === checkout: choose dates
  // 7 === checkout: details/payment
  // 8 === checkout: confirmation
  const [page, setPage] = useState(0); // check this
  const [toyId, setToyId] = useState(1);
  const [toyUserId, setToyUserId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [toysIDCoordsPhoto, setToysIDCoordsPhoto] = useState([]);
  if (page === 0) {
    return (
      <>
        <TopBar
          setPage={setPage}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <BottomBar setPage={setPage} toysIDCoordsPhoto={toysIDCoordsPhoto} setToysIDCoordsPhoto={setToysIDCoordsPhoto} userCoords={userCoords}/>
        <Home
          setPage={setPage}
          setToyId={setToyId}
          setToyUserId={setToyUserId}
          searchTerm={searchTerm}
          userCoords={userCoords}
          toysIDCoordsPhoto={toysIDCoordsPhoto}
          userId={userId}
        />
      </>
    );
  }
  if (page === 1) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <IndividualToy setPage={setPage} toyId={toyId} toyUserId={toyUserId} userId={userId} userCoords={userCoords}/>
      </>
    );
  }
  if (page === 2) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <br></br>
        <UserProfile userId={userId} setPage={setPage} setToyId={setToyId}/>
      </>
    );
  }
  if (page === 3) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <RenteeProfile userId={userId} setPage={setPage} toyUserId={toyUserId}/>
      </>
    );
  }
  if (page === 4) {
    return (
     <>
       <TopBar setPage={setPage}/>
       <AddToy setPage={setPage}/>
     </>
    );
  }
  if (page === 5) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <EditToy setPage={setPage} toyId={toyId} toyUserId={toyUserId} userId={userId}/> /
      </>
    );
  }
  if (page === 6) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <ReserveDates setPage={setPage} toyId={toyId} toyUserId={toyUserId} userId={userId} />
      </>
    );
  }
  if (page === 7) {
    return (
      <>
        <TopBar setPage={setPage}/>
        Dates reserved! Now pay them: <br />
        <br />
        <img src="https://www.belvoirterrace.com/wp-content/uploads/2020/10/Venmo-QR-Code-@Edna-260x300.jpg" alt="venmo payment link"></img>
        <a className="justify-between" onClick={() => setPage(8)}>
                Click <b>here</b> once you have paid $30 to the Venmo account above
              </a>
      </>
    );
  }
  if (page === 8) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <BookingConfirmation/>
        <a className="justify-between" onClick={() => setPage(0)}>
                Booking success! Click <b>here</b> to return to home page
              </a>
      </>
    );
  }
};

export default App;
