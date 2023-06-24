import React from 'react';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import googleMapsApiKey from './googleMapsApiKey.js'; // Restricted key!

const Map = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey });

  return (
      <div className='absolute w-full h-full flex justify-center z-20'>
        {isLoaded ? <GoogleMap zoom={10} center={{ lat: 44, lng: -80 }} mapContainerClassName='w-96 h-96 -translate-y-60' /> : <div>Not Loaded</div>}
      </div>
  );
};

export default Map;
