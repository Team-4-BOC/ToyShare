import React, { useState, useEffect } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
// import axios from 'axios';

const AddToy = (userId) => {
  const [toyName, setToyName] = useState('');
  const [photos, setPhotos] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  });

  const setStateNames = {
    toyName: setToyName,
    photos: setPhotos,
    originalPrice: setOriginalPrice,
    rentalPrice: setRentalPrice,
    description: setDescription,
    deliveryMethod: setDeliveryMethod
  };

  const handleChange = (e) => {
    e.preventDefault();
    const dataName = e.target.name;
    const data = e.target.value;
    const updateState = setStateNames[dataName];
    updateState(data);
  };

  const handleDateChange = (newValue) => {
    console.log("newValue:", newValue);
    setDate(newValue);
};

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div>Add a Toy!</div>
      <input onChange={handleChange} type="text" placeholder="Add Toy Name" className="input input-bordered input-primary w-full max-w-xs" name="toyName" />
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Upload Toy Image</span>
          {/* <span className="label-text-alt">Alt label</span> */}
        </label>
        <input onChange={handleChange} type="file" multiple="multiple" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" name="photos"/>
        <label className="label">
          {/* <span className="label-text-alt">Alt label</span>
          <span className="label-text-alt">Alt label</span> */}
        </label>
      </div>
      <input onChange={handleChange} type="text" placeholder="Add Original Price" className="input input-bordered input-primary w-full max-w-xs" name="originalPrice"/>
      <input onChange={handleChange} type="text" placeholder="Add Rental Price" className="input input-bordered input-primary w-full max-w-xs" name="rentalPrice"/>
      <input onChange={handleChange} type="text" placeholder="Add Description" className="input input-bordered input-primary w-full max-w-xs" name="description"/>
      <select onChange={handleChange} className="select select-primary w-full max-w-xs" name="deliveryMethod">
        <option disabled selected>Select Delivery Methods</option>
        <option>Pick Up</option>
        <option>Delivery</option>
        <option>Pick Up & Delivery</option>
      </select>
      {/* <div className="stats"> */}
        {/* <div className="stat"> */}
          <div className="stat-title text-info-content">Input Dates Available</div>
          <div className="stat-value"><Datepicker value={date} onChange={handleDateChange}/></div>
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default AddToy;
