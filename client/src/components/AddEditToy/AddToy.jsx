/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
// import axios from 'axios';

const AddToy = () => {
  const [toyName, setToyName] = useState('');
  const [photos, setPhotos] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [date, setDate] = useState(new Date())

  const setStateNames = {
    toyName: setToyName,
    photos: setPhotos,
    originalPrice: setOriginalPrice,
    rentalPrice: setRentalPrice,
    description: setDescription,
    deliveryMethod: setDeliveryMethod,
    paymentMethod: setPaymentMethod
  };

  const handleChange = (e) => {
    e.preventDefault();
    const dataName = e.target.name;
    const data = e.target.value;
    const updateState = setStateNames[dataName];
    updateState(data);
  };

  const handleDateChange = (newValue) => {
    console.log('newValue:', newValue);
    setDate(newValue);
};

  return (
    <div className="h-screen flex items-center justify-center flex-col space-y-3">
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
      <select onChange={handleChange} className="select select-primary w-full max-w-xs" name="paymentMethod">
        <option disabled selected>Select Payment Methods</option>
        <option>Cash</option>
        <option>Venmo</option>
        <option>Cash & Venmo</option>
      </select>
      <div className="stat-title text-info-content">Input Dates Available</div>
      <DatePicker multiple plugins={[<DatePanel key='1' />]} value={date} onChange={handleDateChange} />
      <button className="btn btn-primary">Submit!</button>
    </div>
  );
};

export default AddToy;
