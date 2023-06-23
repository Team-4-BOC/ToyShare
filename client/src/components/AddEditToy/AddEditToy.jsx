import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const AddEditToy = (userId) => {
  const [toyName, setToyName] = useState('');
  const [photos, setPhotos] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  // const [dates, setDates] = useState('');

  const updateState = {
    toyName: setToyName,
    photos: setPhotos,
    originalPrice: setOriginalPrice,
    rentalPrice: setRentalPrice,
    description: setDescription,
    deliveryMethod: setDeliveryMethod
  };

  const handleInput = (e) => {
    e.preventDefault();
  };
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div>Add a Toy!</div>
      <input type="text" placeholder="Add Toy Name" className="input input-bordered input-primary w-full max-w-xs" />
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Upload Toy Image</span>
          {/* <span className="label-text-alt">Alt label</span> */}
        </label>
        <input type="file" multiple="multiple" className="file-input file-input-bordered w-full max-w-xs" />
        <label className="label">
          {/* <span className="label-text-alt">Alt label</span>
          <span className="label-text-alt">Alt label</span> */}
        </label>
      </div>
      <input type="text" placeholder="Add Original Price" className="input input-bordered input-primary w-full max-w-xs" />
      <input type="text" placeholder="Add Rental Price" className="input input-bordered input-primary w-full max-w-xs" />
      <input type="text" placeholder="Add Description" className="input input-bordered input-primary w-full max-w-xs" />
      <select className="select select-primary w-full max-w-xs">
        <option disabled selected>Select Delivery Methods</option>
        <option>Pick Up</option>
        <option>Delivery</option>
        <option>Pick Up & Delivery</option>
      </select>
      <div>SOMETHING WITH DATES HERE</div>
    </div>
  );
};

export default AddEditToy;
