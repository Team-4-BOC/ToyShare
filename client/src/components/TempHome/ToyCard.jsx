import React, { useEffect, useState } from 'react';
import StarCreator from '../SharedComponents/StarCreator';
import getDistance from '../SharedComponents/getDistance';

function ToyCard ({ toy, handleToyClick, userCoords, toysIDCoordsPhoto, idx }) {
  const [distance, setDistance] = useState();

  useEffect(() => { if (toysIDCoordsPhoto !== undefined && userCoords !== undefined && toysIDCoordsPhoto[idx].latlng) { setDistance(getDistance(userCoords, toysIDCoordsPhoto[idx].latlng)); } }, [toysIDCoordsPhoto, userCoords]);
  return (
    <li class="card bg-base-100 shadow-xl" key={toy.id} onClick={() => handleToyClick(toy.id, toy.user_id)}>
      <figure>
        <img src={toy.photos[0]} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{toy.toy_name}</h2>
        <div>{StarCreator(toy.rating)}</div>
        <h3>Rental Price: ${toy.rental_price}</h3>
        {distance !== undefined ? <h3>{distance > 0 ? distance + ' miles away' : 'Close by'}</h3> : null}
        <div className="card-actions justify-end">
        </div>
      </div>
    </li>
  );
};

export default ToyCard;
