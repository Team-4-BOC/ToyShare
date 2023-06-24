import React from 'react';
// import UserProfile from './components/UserProfile/UserProfile.jsx';
// import RenteeProfile from './components/RenteeProfile/renteeProfile.js';
import ReserveDates from './components/Checkout/reserveDates.js';

const App = () => {
  return (
    <>
      <div className='text-red-950'>Hello World Deployed!!!!</div>
      <button className='btn btn-outline btn-primary'>Daisy Button</button>
      <hr></hr>
      {<ReserveDates />}
      {/* <UserProfile /> */}
    </>
  );
};

export default App;
