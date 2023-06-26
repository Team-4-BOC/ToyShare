import React, { useState, useEffect } from 'react';

import axios from 'axios';

import MapBox from 'react-map-gl';

import mapBoxKey from './mapBoxKey';

const Map = ({ latLng, iconImage }) => {
  const coordinates = latLng.split(',');
  return (
      <div className='absolute w-full h-full flex justify-center z-20'>
        <MapBox initialViewState={{ longitude: coordinates[1], latitude: coordinates[0], zoom: 14 }} style={{ width: window.innerWidth + 'px', height: window.innerHeight / 2 + 'px', transform: 'translateY(-80vw)' }} mapboxAccessToken={mapBoxKey} mapStyle="mapbox://styles/mapbox/streets-v9" >
          Markers Here
        </MapBox>
      </div>
  );
};

export default Map;
