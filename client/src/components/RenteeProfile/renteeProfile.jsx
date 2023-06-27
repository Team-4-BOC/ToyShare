import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarCreator from '../SharedComponents/StarCreator.js';

const userInfo = {
  name: 'Burt Macklyn',
  photo: 'https://pbs.twimg.com/profile_images/1573101768707219456/rOi41vHE_400x400.jpg',
  location: 'Denver, CO',
  rating: '5stars',
  description: 'Loves working on his farm and has a pet alligator',
  inventory: ['T-Rex (full body suit)', '1000pc erector set', 'Remote control airplane', '6x6 red cotton  blanky']
};

const RenteeProfile = ({ userId, setPage, toyUserId }) => {
  const [renteeData, setRenteeData] = useState({});
  const titleStyle = {
    fontSize: 20,
    fontWeight: 'bold'
  };
  useEffect(() => {
    axios.get('/renteepf', { params: { id: toyUserId } })
      .then((data) => {
        // console.log('datad', data.data);
        setRenteeData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!renteeData.user) {
    return (
      <div>
        Loading......
      </div>
    );
  } else {
    return (
    //   <div className="flex items-center flex-col">
    //     <div className="card-body">
    //       <div>
    //         <div>
    //           <img src={renteeData.photo} alt="The man himself"></img>
    //         </div>
    //         <h2>{renteeData.user.first_name + ' ' + renteeData.user.last_name}</h2>
    //         <p>{renteeData.user.city_state}</p>
    //         <div>{StarCreator(3)}</div>
    //       </div>
    //       <div>
    //         <p>{userInfo.description}</p>
    //       </div>
    //     </div>
    //     <div>
    //       <ul className="menu bg-base-200 w-56 rounded-box">
    //         <li>
    //           <h2 className="rental-inventory">Rental Inventory</h2>
    //           <ul>
    //             {renteeData.inventory.map((item, i) => {
    //               return <li key={i}>{item.toy_name}</li>;
    //             })}
    //           </ul>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // );
      <div className="h-screen flex items-center justify-center flex-col">
        <div className="profile" style={{ marginTop: '10px' }}>
          <div className="card card-compact w-80 bg-base-80 shadow-xl">
            <figure><img src={renteeData.photo} /></figure>
            <div className="card-body">
              <h2 className="user-name" style={{ fontSize: 25, fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renteeData.user.first_name} {renteeData.user.last_name}</h2>
              <h2 className="user-location" style={{ fontSize: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renteeData.user.city_state}</h2>
                <div className="user-rating" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {StarCreator(3)}
                </div>
              <p style={{ fontSize: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Proud parent of amazing kids. Check out my inventory of toys for rental!</p>
              <div className="card-actions justify-end">
              </div>
              {/* <button onClick={() => setPage(2)} className="btn-sm" style={{ fontSize: 12, textAlign: 'right' }}>Back</button> */}
            </div>
            <br></br>
            <br></br>
            <div className="user-toys">
              <ul className="menu bg-base-200 w-100 rounded-box">
                <li>
                  <h2 className="rental-inventory" style={titleStyle}>Rental Inventory</h2>
                  <ul>
                  {renteeData.inventory.map(toy => <div key={toy.id}>• {toy.toy_name}</div>)}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default RenteeProfile;
