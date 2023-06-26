import React, { useState, useEffect } from 'react';

import axios from 'axios';

import MapBox from 'react-map-gl';

import mapBoxKey from './mapBoxKey';

const Map = ({ city, state, iconImage }) => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: '100vw',
    height: '100vw'
  });
  const fetchCoordinates = () => {
  };

  useEffect(fetchCoordinates, []);
  return (
      <div className='absolute w-full h-full flex justify-center z-20'>
        <MapBox initialViewState={{ longitude: -122.4, latitude: 37.8, zoom: 14 }} style={{ width: window.innerWidth + 'px', height: window.innerHeight / 2 + 'px', transform: 'translateY(-80vw)' }} mapboxAccessToken={mapBoxKey} mapStyle="mapbox://styles/mapbox/streets-v9" >
          Markers Here
        </MapBox>
      </div>
  );
};

export default Map;
