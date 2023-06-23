import React, { useState } from 'react';
// import UserProfile from './components/UserProfile/UserProfile.jsx';
import RenteeProfile from './components/RenteeProfile/renteeProfile.jsx';
// import PhotoCarousel from './components/IndividualToy/components/PhotoCarousel.jsx';
// import ToyInfo from './components/IndividualToy/components/ToyInfo.jsx';
// import ToyReserve from './components/IndividualToy/components/ToyReserve.jsx';
// import Home from './components/Home/placeholer.jsx';
// import AddEditToy from './components/AddEditToy/placeholer.jsx';
// import Checkout from './components/Checkout/placeholer.jsx';

const App = () => {
  // 0 === homepage
  // 1 === individual toy page
  // 2 === user profile
  // 3 === rentee profile
  // 4 === add/edit a toy
  // 5 === checkout 1 (RESERVED)
  // 6 === checkout 2 (RESERVED)
  // 7 === checkout 3 (RESERVED)
  const [page, setPage] = useState(3);

  // if (page === 0) {
  //   return (
  //     <>
  //       <Home setPage={setPage}/>
  //     </>
  //   );
  // }
  // if (page === 1) {
  //   return (
  //     <>
  //       <PhotoCarousel />
  //       <ToyInfo />
  //       <ToyReserve />
  //     </>
  //   );
  // }
  // if (page === 2) {
  //   return (
  //     <>
  //       <UserProfile setPage={setPage}/>
  //     </>
  //   );
  // }
  if (page === 3) {
    return (
      <>
        <RenteeProfile userId={2} setPage={setPage}/>
      </>
    );
  }
  // if (page === 4) {
  //   return (
  //     <>
  //       <AddEditToy setPage={setPage}/>
  //     </>
  //   );
  // }
  // if (page === 5) {
  //   return (
  //     <>
  //       <Checkout setPage={setPage}/>
  //     </>
  //   );
  // }
  if (page === 9) {
    return (
      <>
        <div className='text-red-950'>Hello World Deployed!!!</div>
        <button className='btn btn-outline btn-primary'>Daisy Button</button>
      </>
    );
  }
};

export default App;
