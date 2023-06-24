/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PhotoCarousel from '../IndividualToy/components/PhotoCarousel.jsx';
import axios from 'axios';


const EditToy = (toyId, userId) => {
  const [toyName, setToyName] = useState('');
  const [photos, setPhotos] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  });

  const fetchToy = () => {
    axios.get('toy', { params: { toy_id: 19, current_user_id: 1 } }) // Fix current user id and toy id
      .then((apiResults) => {
        console.log('TOY DATA', apiResults);
        const data = apiResults.data;
        setToyName(data.name);
        setPhotos(data.photos);
        setOriginalPrice(data.original_price);
        setRentalPrice(data.payment_method);
        setDescription(data.description);
        setDeliveryMethod(data.delivery_method);
        setPaymentMethod(data.payment_method);
      })
      .catch((err) => {
        console.log('EROR fetching toy: ', err);
      });
  };

  useEffect(fetchToy, []); // On startup

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
    console.log('newValue:', newValue);
    setDate(newValue);
  };

  console.log('test', {photos: photos});

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div>Add a Toy!</div>
      <input onChange={handleChange} type="text" placeholder="Add Toy Name" defaultValue={description} className="input input-bordered input-primary w-full max-w-xs" name="toyName" />
      {/* {photos !== '' ? <PhotoCarousel toy={{ photos: photos }}/> : null} */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Upload Toy Image</span>
        </label>
        <input onChange={handleChange} type="file" multiple="multiple" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" name="photos"/>
        <label className="label">
        </label>
      </div>
      <input onChange={handleChange} type="text" placeholder="Add Original Price" defaultValue={originalPrice} className="input input-bordered input-primary w-full max-w-xs" name="originalPrice"/>
      <input onChange={handleChange} type="text" placeholder="Add Rental Price" className="input input-bordered input-primary w-full max-w-xs" defaultValue={rentalPrice} name="rentalPrice"/>
      <input onChange={handleChange} type="text" placeholder="Add Description" className="input input-bordered input-primary w-full max-w-xs" defaultValue={description} name="description"/>
      <select onChange={handleChange} className="select select-primary w-full max-w-xs" defaultValue={deliveryMethod} name="deliveryMethod">
        <option disabled selected>Select Delivery Methods</option>
        <option>Pick Up</option>
        <option>Delivery</option>
        <option>Pick Up & Delivery</option>
      </select>
      <select onChange={handleChange} className="select select-primary w-full max-w-xs" defaultValue={paymentMethod}name="paymentMethod">
        <option disabled selected>Select Payment Methods</option>
        <option>Cash</option>
        <option>Venmo</option>
        <option>Cash & Venmo</option>
      </select>
    </div>
  );
};

export default EditToy;
