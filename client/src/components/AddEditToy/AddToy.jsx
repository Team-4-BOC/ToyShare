/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import axios from 'axios';

const AddToy = () => {
  const [toyName, setToyName] = useState('');
  const [photos, setPhotos] = useState('');
  const [imageURLS, setImageURLS] = useState([]);
  const [originalPrice, setOriginalPrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [dateValues, setDateValues] = useState(new Date().setDate(new Date().getDate() + 1));
  const [currentCategories, setCurrentCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const getCategories = () => {
    axios.get('/toys/category')
      .then((res) => {
        setCurrentCategories(res.data);
      })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const uploadImages = async (photo) => {
    const url = await axios.get('/s3Url').then((res) => { return res.data.url; });
    const config = {
      headers: {
        'Content-Type': 'image'
      }
    };
    await axios.put(url, photo, config);
    const imageUrl = url.split('?')[0];
    setImageURLS(imageURLS => [...imageURLS, imageUrl]);
  };
  const uploadAllImages = async () => {
    for (let i = 0; i < photos.length; i++) {
      uploadImages(photos[i]);
    }
  };

  const setStateNames = {
    toyName: setToyName,
    originalPrice: setOriginalPrice,
    rentalPrice: setRentalPrice,
    description: setDescription,
    deliveryMethod: setDeliveryMethod,
    paymentMethod: setPaymentMethod,
    selectedCategory: setSelectedCategory
  };

  const handleChange = (e) => {
    e.preventDefault();
    const dataName = e.target.name;
    const data = e.target.value;
    const updateState = setStateNames[dataName];
    updateState(data);
  };

  const handlePhotoUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    setPhotos(files);
  };

  const handleDateChange = (newValue) => {
    console.log('newValue:', newValue);
    setDateValues(newValue);
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col space-y-3">
      <div>Add a Toy!</div>
      <input onChange={handleChange} type="text" placeholder="Add Toy Name" className="input input-bordered input-primary w-full max-w-xs" name="toyName" />
      <select onChange={handleChange} className="select select-primary w-full max-w-xs" name="selectedCategory">
        <option disabled selected>Select Toy Category</option>
       {currentCategories.map(category => <option key={category.id} > {category.name} </option>)}
      </select>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Upload Toy Image</span>
        </label>
        <input onChange={handlePhotoUpload} type="file" accept="image/*" multiple="multiple" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" name="photos"/>
        <label className="label">
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
      <DatePicker multiple minDate={new Date().setDate(new Date().getDate() + 1)} plugins={[<DatePanel key='1' />]} value={dateValues} onChange={handleDateChange} />
      <button onClick={uploadAllImages} className="btn btn-primary">Submit!</button>
    </div>
  );
};

export default AddToy;
