/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

import { verifySignedIn } from '../../Firebase.js';

import Map from '../SharedComponents/Map.jsx';

import axios from 'axios';

const BottomBar = ({ setPage, toysIDCoordsPhoto, setToysIDCoordsPhoto, userCoords, sort, setSort, filter, setFilter }) => {
  const [map, setMap] = useState(false);

  const fetchToysIDCoordsPhoto = () => {
    axios.get('/toysIDCoordsPhoto')
      .then((apiData) => {
        setToysIDCoordsPhoto(apiData.data);
      })
      .catch((err) => {
        console.log('ERROR fetching toys map info ', err);
      });
  };

  const onAddToyClick = () => {
    const isSignedIn = verifySignedIn();
    if (isSignedIn) {
      setPage(4);
    } else {
      swal({
        title: 'Warning!',
        text: 'Please sign in to add a toy',
        icon: 'warning',
        button: 'OK'
      });
    }
  };

  useEffect(fetchToysIDCoordsPhoto, []);

  return (
    <>
      {map ? <div className='w-screen h-screen bg-slate-400/40 top-0 left-0 fixed z-30' onClick={() => { setMap(false); }}></div> : null}
      <div className='fixed bottom-0 bg-primary z-10 w-full shadow-md shadow-black rounded-tr-2xl rounded-tl-2xl flex justify-center space-x-1'>
        <button className="active:bg-gray-100 text-black py-3 px-4 rounded-full border border-solid" onClick={onAddToyClick}>
          AddToy
        </button>
        <select className="select sort" value={sort} onChange={() => { setSort(event.target.value); }}>
          <option value="">Sort by</option>
          <option value="newest">Newest</option>
          <option value="rating">Rating</option>
          <option value="distance">Distance</option>
        </select>
        <select className="select filter" value={filter} onChange={() => { setFilter(event.target.value); }}>
          <option value="">Filter</option>
          <option value="recommend">Recommend</option>
          <option value="">All</option>
        </select>
        {!map && toysIDCoordsPhoto !== undefined ? <div className='shadow-sm shadow-black rounded-full'><img data-testid='it-map' className='inline-block hover:opacity-30 w-9 h-9 translate-y-2' src='./icons/mapIcon.png' onClick={() => setMap(true)}/></div> : null}
      </div>
      {map ? <Map toysIDCoordsPhoto={toysIDCoordsPhoto}/> : null}
    </>
  );
};

export default BottomBar;
