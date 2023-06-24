import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import UserProfile from './components/UserProfile/UserProfile.jsx';
import RenteeProfile from './components/RenteeProfile/renteeProfile.jsx';
import IndividualToy from './components/IndividualToy/IndividualToy.jsx';
import Home from './components/TempHome/Home.jsx';
// import AddEditToy from './components/AddEditToy/placeholer.jsx';
// import Checkout from './components/Checkout/placeholer.jsx';
import TopBar from './components/TempHome/TopBar.jsx';
// import { use } from 'matter';
// import { getCurrentUserInfo } from './Firebase.js';

const App = () => {
  const [userId, setUserId] = useState(0);

  const getUserId = () => {
    // const userInfo = getCurrentUserInfo();
    axios.get('/userNew', { params: { email: 'JoshMan@email.com' } })
      .then((data) => {
        // console.log('data', data.data[0].id);
        setUserId(data.data[0].id);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUserId();
  }, []);

  // 0 === homepage
  // 1 === individual toy page
  // 2 === user profile
  // 3 === rentee profile
  // 4 === add/edit a toy
  // 5 === checkout 1 (RESERVED)
  // 6 === checkout 2 (RESERVED)
  // 7 === checkout 3 (RESERVED)
  const [page, setPage] = useState(0);
  const [toyId, setToyId] = useState(1);
  const [toyUserId, setToyUserId] = useState(1);
  if (page === 0) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <Home setPage={setPage} setToyId={setToyId} setToyUserId={setToyUserId}/>
      </>
    );
  }
  if (page === 1) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <IndividualToy setPage={setPage} toyId={toyId} toyUserId={toyUserId}/>
      </>
    );
  }
  // if (page === 2) {
  //   return (
  //     <>
  //       <TopBar setPage={setPage}/>
  //       <UserProfile setPage={setPage} />
  //     </>
  //   );
  // }
  if (page === 3) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <RenteeProfile userId={userId} setPage={setPage} toyUserId={toyUserId}/>
      </>
    );
  }
  // if (page === 4) {
  return (
      <>
        <TopBar setPage={setPage}/>
        {/* <EditToy setPage={setPage} /> */}
      </>
  );
  // }
  // if (page === 5) {
  //   return (
  //     <>
  //       <TopBar setPage={setPage}/>
  //       <Checkout setPage={setPage} toyId={toyId} />
  //     </>
  //   );
  // }
  // if (page === 9) {
  //   return (
  //     <>
  //       <div className='text-red-950'>Hello World Deployed!!!</div>
  //       <button className='btn btn-outline btn-primary'>Daisy Button</button>
  //     </>
  //   );
  // }
};

export default App;
