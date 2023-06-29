import React, { useEffect, useState } from 'react';
import StarCreator from '../SharedComponents/StarCreator';

import getDistance from '../SharedComponents/getDistance';

function ToyCard ({ toy, handleToyClick, userCoords, toysIDCoordsPhoto }) {
  const [distance, setDistance] = useState();

  useEffect(() => { if (toysIDCoordsPhoto !== undefined && userCoords !== undefined) { setDistance(getDistance(userCoords, toysIDCoordsPhoto[toy.id - 1].latlng)); } }, [toysIDCoordsPhoto, userCoords]);
  return (
    <div className="toycard" onClick={() => handleToyClick(toy.id, toy.user_id)}>
      <br></br>
      <div className="card w-screen bg-base-100 shadow-xl">
        <figure><img src={toy.photos[0]} /></figure>
        <div className="card-body">
          <h2 className="card-title">{toy.toy_name}</h2>
          <p>{toy.toy_description.slice(0, 40)}...</p>
          <h3>Original Price: ${toy.original_price}</h3>
          <h3>Rental Price: ${toy.rental_price}</h3>
          {distance !== undefined ? <h3>{distance > 0 ? distance + ' miles away' : 'Close by'}</h3> : null}
          <div className="card-actions justify-end">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToyCard;
