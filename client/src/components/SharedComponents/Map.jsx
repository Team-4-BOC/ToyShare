import React, { useEffect, useState } from 'react';

import MapBox, { Marker } from 'react-map-gl';

import mapBoxKey from './tempMapBoxKey.js'; // Fix me -------------------------------==-=-=-
import { Translate } from 'aws-sdk';

const Map = ({ latLng, iconImage, toysIDCoordsPhoto, userCoords, setPage, setToyId }) => {
  const [coordinates, setCoordinates] = useState();
  const [zoom, setZoom] = useState();
  const [groupedToyCoordinates, setGroupedToyCoordinates] = useState();
  const [toyList, setToyList] = useState();

  const distanceWithinRadius = (lat1, lon1, lat2, lon2, radius) => { // Returns a close enough distance
    const latDiff = Math.abs(lat1 - lat2);
    const lonDiff = Math.abs(lon1 - lon2);

    const latDistance = latDiff * 69;
    const lonDistance = lonDiff * 69;

    const distance = Math.sqrt(latDistance ** 2 + lonDistance ** 2);

    return distance <= radius;
  };

  const groupSimilarLocations = (toys, radius) => { // raduis in miles
    const groups = [];

    for (let i = 0; i < toys.length; i++) {
      let location;
      if (toys[i].latlng) {
        location = toys[i].latlng.split(',');
      } else {
        break;
      }
      let groupFound = false;

      // Check if the location can be added to an existing group
      for (let j = 0; j < groups.length; j++) {
        const group = groups[j];
        const groupLocation = group.location;

        if (distanceWithinRadius(groupLocation[0], groupLocation[1], location[0], location[1], radius)) {
          group.toys.push({ photo: toys[i].photo, id: toys[i].id }); // Add toy photo to the existing group
          groupFound = true;
          break;
        }
      }

      // If no existing group found, create a new group
      if (!groupFound) {
        groups.push({ location, toys: [{ photo: toys[i].photo, id: toys[i].id }] }); // Create a new group with the toy photo
      }
    }
    return groups;
  };

  const setMap = () => {
    if (toysIDCoordsPhoto) {
      if (userCoords) {
        setCoordinates(userCoords.split(','));
      } else {
        setCoordinates([38.500000, -98.0000]);
      }
      setGroupedToyCoordinates(groupSimilarLocations(toysIDCoordsPhoto, 30));
      setZoom(4);
    } else if (latLng !== undefined) {
      setCoordinates(latLng.split(','));
      setZoom(6);
    }
  };
  useEffect(setMap, [toysIDCoordsPhoto]);

  const handleViewStateChange = (props) => {
    const markerElements = document.querySelectorAll('.marker-element');
    const size = props.viewState.zoom * 20;

    markerElements.forEach((element) => {
      element.style.height = size + 'px';
      element.style.width = size + 'px';
    });
  };

  const handleMarkerClick = (toyGroup, toyId) => {
    if (toyGroup) {
      if (toyGroup.toys.length !== 1) {
        setToyList(toyGroup.toys);
      } else {
        setToyId(toyGroup.toys[0].id);
        setPage(1);
      }
    } else {
      setToyId(toyId);
      setPage(1);
    }
  };
  return (
      <div>
        {toyList ? <div className='bg-gray-600/50 fixed z-40' style={{ width: window.innerWidth / 1.1 + 'px', height: window.innerHeight / 1.4 + 'px', top: '50%', right: '50%', transform: 'translate(50%, -50%)' }} onClick={() => setToyList()} /> : null} {/* Close toy list modal */}
        {toyList ? <div className='z-40 fixed px-5 py-5 rounded-lg shadow-lg bg-primary/50 shadow-black overflow-auto max-h-96' style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{toyList.map((curToy, idx) => { return (<img className='w-32 h-32 rounded-md mb-5' key={idx * 2} src={curToy.photo} alt="Image" onClick={() => handleMarkerClick(false, curToy.id)}/>); })}</div> : null}
        {coordinates !== undefined
          ? <MapBox initialViewState={{ latitude: coordinates[0], longitude: coordinates[1], zoom }} style={{ width: window.innerWidth / 1.1 + 'px', height: window.innerHeight / 1.4 + 'px', position: 'fixed', top: '50%', right: '50%', transform: 'translate(50%, -50%)', zIndex: 30 }} mapboxAccessToken={mapBoxKey} mapStyle="mapbox://styles/mapbox/streets-v9" onZoom={handleViewStateChange} >
            {groupedToyCoordinates !== undefined
              ? groupedToyCoordinates.map((toyGroup, idx) => {
                const markerCoordinates = toyGroup.location;
                return (
                  <Marker latitude={markerCoordinates[0]} longitude={markerCoordinates[1]} anchor="bottom" key={idx * 10}>
                    <div className="icon-container">
                      <div className="icon marker-element" style={{ width: '40px', height: '40px' }}>
                        <div className="marker-icon"/>
                        {toyGroup.toys.length === 1 ? <img src={toyGroup.toys[0].photo} alt="Image" onClick={() => handleMarkerClick(toyGroup)}/> : <img src='https://thumbs.dreamstime.com/b/hand-cursor-click-icon-isolated-blue-round-button-illustration-hand-cursor-click-icon-blue-round-button-illustration-167324051.jpg' alt="Click" onClick={() => handleMarkerClick(toyGroup)}/>}
                      </div>
                    </div>
                  </Marker>
                );
              })
              : <Marker latitude={coordinates[0]} longitude={coordinates[1]} anchor="bottom" >
                  <div className="icon-container">
                  <div className="icon marker-element" style={{ width: '100px', height: '100px' }}>
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
