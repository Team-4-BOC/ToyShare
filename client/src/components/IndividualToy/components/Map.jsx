import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import googleMapsApiKey from './googleMapsApiKey.js'; // Restricted key!

const Map = ({ city, state }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey });

  const [coordinates, setCoordinates] = useState(false);

  const fetchCoordinates = () => {
    axios.get((`https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=${googleMapsApiKey}`))
      .then((apiData) => {
        setCoordinates(apiData.data.results[0].geometry.location);
      })
      .catch((err) => {
        console.log('ERROR fetching coordinates ', err);
      });
  };

  useEffect(fetchCoordinates, []);
  return (
      <div className='absolute w-full h-full flex justify-center z-20'>
        {isLoaded && coordinates
          ? <GoogleMap zoom={5} center={{ lat: coordinates.lat, lng: coordinates.lng }} mapContainerClassName='w-96 h-96 -translate-y-60' >
              <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }}/>
          </GoogleMap>
          : <div>Loading Google Maps...</div>
        }
      </div>
  );
};

export default Map;
