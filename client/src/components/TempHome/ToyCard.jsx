import React from 'react';

function ToyCard ({ toy, handleToyClick }) {
  return (
    <div className="toycard" onClick={() => handleToyClick(toy.id, toy.user_id)}>
      <br></br>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={toy.photos[0]} /></figure>
        <div className="card-body">
          <h2 className="card-title">{toy.toy_name}</h2>
          <p>{toy.toy_description}</p>
          <h3>Original Price: ${toy.original_price}</h3>
          <h3>Rental Price: ${toy.rental_price}</h3>
          <div className="card-actions justify-end">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToyCard;
