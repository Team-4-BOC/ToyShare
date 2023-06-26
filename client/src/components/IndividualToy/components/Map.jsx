import React, { useState, useEffect } from 'react';

import axios from 'axios';

import MapBox, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

import mapBoxKey from './mapBoxKey';

const Map = ({ latLng, iconImage }) => {
  const coordinates = latLng.split(',');

  const handleViewStateChange = (props) => {
    const markerElement = document.querySelector('.marker-element');
    const size = props.viewState.zoom * 7;
    console.log(size);
    markerElement.style.height = size + 'px';
    markerElement.style.width = size + 'px';
  };

  return (
      <div className='absolute w-full h-full flex justify-center z-20'>
        <MapBox initialViewState={{ latitude: coordinates[0], longitude: coordinates[1], zoom: 5 }} style={{ width: window.innerWidth + 'px', height: window.innerHeight / 2 + 'px', transform: 'translateY(-80vw)' }} mapboxAccessToken={mapBoxKey} mapStyle="mapbox://styles/mapbox/streets-v9" onZoom={handleViewStateChange}>
          <Marker latitude={coordinates[0]} longitude={coordinates[1]} anchor="bottom" >
            <img className='marker-element rounded-3xl' style={{ height: '50px', width: '50px' }} src={iconImage}/>
        </Marker>
        </MapBox>
      </div>
  );
};

export default Map;
