import React, { useEffect, useState } from 'react';

import MapBox, { Marker } from 'react-map-gl';

import mapBoxKey from './mapBoxKey';

const Map = ({ latLng, iconImage, toys }) => {
  const [coordinates, setCoordinates] = useState();
  const [zoom, setZoom] = useState();

  const setMap = () => {
    if (toys !== undefined) {
      setCoordinates([38.500000, -98.0000]);
      setZoom(4);
    } else if (latLng !== undefined) {
      setCoordinates(latLng.split(','));
      setZoom(6);
    }
  };
  useEffect(setMap, []);

  const handleViewStateChange = (props) => {
    const markerElements = document.querySelectorAll('.marker-element');
    const size = props.viewState.zoom * 20;
    markerElements.forEach((element) => {
      element.style.height = size + 'px';
      element.style.width = size + 'px';
    });
  };
  return (
      <div>
        {coordinates !== undefined
          ? <MapBox initialViewState={{ latitude: coordinates[0], longitude: coordinates[1], zoom }} style={{ width: window.innerWidth / 1.1 + 'px', height: window.innerHeight / 1.4 + 'px', position: 'fixed', top: '50%', right: '50%', transform: 'translate(50%, -50%)', zIndex: 30 }} mapboxAccessToken={mapBoxKey} mapStyle="mapbox://styles/mapbox/streets-v9" onZoom={handleViewStateChange}>
            {toys !== undefined
              ? toys.map((toy, idx) => {
                const markerCoordinates = toy.latlng.split(',');
                console.log(markerCoordinates);
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
