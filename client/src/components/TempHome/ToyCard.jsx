import React from 'react';
import StarCreator from '../SharedComponents/StarCreator';

function ToyCard ({ toy, handleToyClick }) {
  return (
    <div className="toycard" onClick={() => handleToyClick(toy.id, toy.user_id)}>
      <br></br>
      <div className="card w-screen bg-base-100 shadow-xl">
        <figure><img src={toy.photos[0]} /></figure>
        <div className="card-body">
          <h2 className="card-title">{toy.toy_name}</h2>
          <div>{StarCreator(toy.rating)}</div>
          <h3>Rental Price: ${toy.rental_price}/mo</h3>
          <div className="card-actions justify-end">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToyCard;
