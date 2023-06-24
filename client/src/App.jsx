import React, { useState } from 'react';
import UserProfile from './components/UserProfile/UserProfile.jsx';
// import RenteeProfile from './components/RenteeProfile/renteeProfile.jsx';
import IndividualToy from './components/IndividualToy/IndividualToy.jsx';
import Home from './components/TempHome/Home.jsx';
// import AddEditToy from './components/AddEditToy/placeholer.jsx';
// import Checkout from './components/Checkout/placeholer.jsx';
import TopBar from './components/TempHome/TopBar.jsx';

const App = () => {
  // 0 === homepage
  // 1 === individual toy page
  // 2 === user profile
  // 3 === rentee profile
  // 4 === add/edit a toy
  // 5 === checkout 1 (RESERVED)
  // 6 === checkout 2 (RESERVED)
  // 7 === checkout 3 (RESERVED)
  const [page, setPage] = useState(2);
  if (page === 0) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <Home />
      </>
    );
  }
  if (page === 1) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <IndividualToy setPage={setPage}/>
      </>
    );
  }
  if (page === 2) {
    return (
      <>
        <TopBar setPage={setPage}/>
        <br></br>
        <UserProfile setPage={setPage} />
      </>
    );
  }
  // if (page === 3) {
  //   return (
  //     <>
  //       <TopBar setPage={setPage}/>
  //       <RenteeProfile userId={2} setPage={setPage} />
  //     </>
  //   );
  // }
  // if (page === 4) {
  //   return (
  //     <>
  //       <TopBar setPage={setPage}/>
  //       <AddEditToy setPage={setPage} />
  //     </>
  //   );
  // }
  // if (page === 5) {
  //   return (
  //     <>
  //       <TopBar setPage={setPage}/>
  //       <Checkout setPage={setPage} />
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
