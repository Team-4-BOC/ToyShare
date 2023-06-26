import React from 'react';

import MapBox, { Marker } from 'react-map-gl';

import mapBoxKey from './mapBoxKey';

const Map = ({ latLng, iconImage, toys }) => {
  const coordinates = latLng.split(',');

  const handleViewStateChange = (props) => {
    const markerElements = document.querySelectorAll('.marker-element');
    const size = props.viewState.zoom * 9;
    markerElements.forEach((element) => {
      element.style.height = size + 'px';
      element.style.width = size + 'px';
    });
  };

  return (
      <div className='absolute w-full h-full flex justify-center z-20'>
        <MapBox initialViewState={{ latitude: coordinates[0], longitude: coordinates[1], zoom: 5 }} style={{ width: window.innerWidth + 'px', height: window.innerHeight / 2 + 'px', transform: 'translateY(-80vw)' }} mapboxAccessToken={mapBoxKey} mapStyle="mapbox://styles/mapbox/streets-v9" onZoom={handleViewStateChange}>
          <Marker latitude={coordinates[0]} longitude={coordinates[1]} anchor="bottom" >
            {toys !== undefined
              ? toys.map((toy, idx) => {
                return (<div key={idx * 10}>Hello world</div>);
              })
              : <div className="icon-container">
                <div className="icon marker-element" style={{ width: '45px', height: '45px' }}>
                  <div className="marker-icon" />
                  <img src={iconImage} alt="Image" />
                </div>
              </div>}
        </Marker>
        </MapBox>
      </div>
  );
};

export default Map;
