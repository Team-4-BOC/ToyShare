/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import axios from 'axios';

const AddToy = (userId) => {
  const [toyName, setToyName] = useState('');
  const [photos, setPhotos] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [dateValues, setDateValues] = useState(new Date().setDate(new Date().getDate() + 1));
  const [datesFormatted, setDatesFormatted] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [rating, setRating] = useState('');

  // FUNCTIONS
  // - API CALLS
  const getCategories = () => {
    axios.get('/toys/category')
      .then((res) => {
        setCurrentCategories(res.data);
      })
      .catch((err) => { console.log(err); });
  };

  const setRandomRating = () => {
    const randomRating = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    setRating(randomRating);
  };

  const uploadImages = async (photo) => {
    const url = await axios.get('/s3Url').then((res) => { return res.data.url; });
    const config = {
      headers: {
        'Content-Type': 'image'
      }
    };
    await axios.put(url, photo, config);
    const imageUrl = url.split('?')[0];
    return imageUrl;
  };

  const uploadAllImages = () => {
    const resultURLs = [];
    for (let i = 0; i < photos.length; i++) {
      resultURLs.push(uploadImages(photos[i]));
    }
    return Promise.all(resultURLs);
  };

  const addToy = async () => {
    const addToy = await axios.post('/toys', {
      toy_name: toyName,
      category_id: selectedCategory,
      rating: rating,
      user_id: 3,
      toy_description: description,
      original_price: originalPrice,
      rental_price: rentalPrice,
      delivery_method: deliveryMethod,
      payment_method: paymentMethod
    });
    const toyId = addToy.data.rows[0].id;
    const imageURLS = await uploadAllImages();
    await axios.post('/toys/photos', { toyId: toyId, photoURLs: imageURLS });
    await axios.post('/toys/dates', { toyId: toyId, dates: datesFormatted });
    // eslint-disable-next-line no-undef
    alert('Toy Added!');
  };

  // - CHANGE FUNCTIONS

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
    if (dataName === 'selectedCategory') {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const id = selectedOption.getAttribute('data-key');
      const data = id;
      const updateState = setStateNames[dataName];
      updateState(data);
    } else {
      const data = e.target.value;
      const updateState = setStateNames[dataName];
      updateState(data);
    }
  };

  const handlePhotoUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    setPhotos(files);
  };

  const handleDateChange = (inputDates) => {
    // eslint-disable-next-line quotes
    const newDatesList = [];
    for (let i = 0; i < inputDates.length; i++) {
      const date = `${inputDates[i].year}-${String(inputDates[i].month).padStart(2, '0')}-${String(inputDates[i].day).padStart(2, '0')}`;
      newDatesList.push(date);
    }
    setDatesFormatted(newDatesList);
    setDateValues(inputDates);
  };
  // END FUNCTIONS----

  // USE EFFECTS
  useEffect(() => {
    getCategories();
    setRandomRating();
  }, []);
  // END USE EFFECTS

  // ELEMENTS
  return (
    <div className="h-screen flex items-center justify-center flex-col space-y-3 overflow-y-scroll">
      <div>Add a Toy!</div>
      <input onChange={handleChange} type="text" placeholder="Add Toy Name" className="input input-bordered input-primary w-full max-w-xs" name="toyName" />
      <select onChange={handleChange} className="select select-primary w-full max-w-xs" name="selectedCategory">
        <option disabled selected>Select Toy Category</option>
       {currentCategories.map(category => <option key={category.id} data-key={category.id}> {category.name} </option>)}
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
      <button onClick={addToy} className="btn btn-primary">Submit!</button>
    </div>
  );
};

export default AddToy;
