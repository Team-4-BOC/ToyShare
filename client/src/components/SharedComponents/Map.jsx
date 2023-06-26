import React, { useEffect, useState } from 'react';

import MapBox, { Marker } from 'react-map-gl';

import mapBoxKey from './mapBoxKey';

const Map = ({ latLng, iconImage, toys }) => {
  const [coordinates, setCoordinates] = useState();
  const [zoom, setZoom] = useState();
  console.log(coordinates);
  const setMap = () => {
    if (toys !== undefined) {
      setCoordinates([37.05247, 95.42464]);
      setZoom(1);
    } else {
      setCoordinates(latLng.split(','));
      setZoom(5);
    }
  };
  useEffect(setMap, []);

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
        {coordinates !== undefined
          ? <MapBox initialViewState={{ latitude: coordinates[0], longitude: coordinates[1], zoom }} style={{ width: window.innerWidth + 'px', height: window.innerHeight / 2 + 'px', transform: 'translateY(-80vw)' }} mapboxAccessToken={mapBoxKey} mapStyle="mapbox://styles/mapbox/streets-v9" onZoom={handleViewStateChange}>
            {toys !== undefined
              ? toys.map((toy, idx) => {
                const markerCoordinates = toy.latLng.split(',');
                return (
                  <Marker latitude={markerCoordinates[0]} longitude={markerCoordinates[1]} anchor="bottom" key={idx * 10}>
                    <div className="icon-container">
                      <div className="icon marker-element" style={{ width: '45px', height: '45px' }}>
                        <div className="marker-icon" />
                        <img src={toy.photos[0]} alt="Image" />
                      </div>
                    </div>
                  </Marker>
                );
              })
              : <Marker latitude={coordinates[0]} longitude={coordinates[1]} anchor="bottom" >
                  <div className="icon-container">
                  <div className="icon marker-element" style={{ width: '45px', height: '45px' }}>
                    <div className="marker-icon" />
                    <img src={iconImage} alt="Image" />
                  </div>
                </div>
              </Marker>}
        </MapBox>
          : null}
      </div>
  );
};

export default Map;
