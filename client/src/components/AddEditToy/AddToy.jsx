/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import axios from 'axios';
import swal from 'sweetalert';

const AddToy = ({ userId, setPage, setToyId }) => {
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
      user_id: userId,
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
    setToyId(toyId);
    // eslint-disable-next-line no-undef
    swal({
      title: 'Added Toy',
      text: 'You succesfully added toy!',
      icon: 'success',
      button: 'OK'
    })
      .then(() => {
        setPage(1);
      });
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

      <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text">Add Toy Name</span>
          </label>
        <input aria-label='Add Toy Name' onChange={handleChange} type="text" placeholder="Add Toy Name" className="input input-bordered input-primary w-full max-w-xs" name="toyName" />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text">Select Toy Category</span>
          </label>
        <select aria-label='Select Toy Category' onChange={handleChange} className="select select-primary w-full max-w-xs" defaultValue='Select Toy Category' name="selectedCategory">
          <option disabled>Select Toy Category</option>
          {currentCategories.map(category => <option key={category.id} data-key={category.id}> {category.name} </option>)}
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Upload Toy Image</span>
        </label>
        <input aria-label='Upload Toy Image' onChange={handlePhotoUpload} type="file" accept="image/*" multiple="multiple" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" name="photos"/>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text">Add Original Price</span>
          </label>
        <input aria-label='Add Original Price' onChange={handleChange} type="text" placeholder="Add Original Price" className="input input-bordered input-primary w-full max-w-xs" name="originalPrice"/>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text">Add Rental Price</span>
          </label>
        <input aria-label='Add Rental Price' onChange={handleChange} type="text" placeholder="Add Rental Price" className="input input-bordered input-primary w-full max-w-xs" name="rentalPrice"/>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text">Add Description</span>
          </label>
        <input aria-label='Add Description' onChange={handleChange} type="text" placeholder="Add Description" className="input input-bordered input-primary w-full max-w-xs" name="description"/>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text">Select Delivery Methods</span>
          </label>
        <select aria-label='Select Delivery Methods' onChange={handleChange} defaultValue='Select Delivery Methods' className="select select-primary w-full max-w-xs" name="deliveryMethod">
          <option disabled>Select Delivery Methods</option>
          <option>Pick Up</option>
          <option>Delivery</option>
          <option>Pick Up & Delivery</option>
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text">Select Payment Methods</span>
          </label>
        <select aria-label='Select Payment Methods' onChange={handleChange} defaultValue='Select Payment Methods' className="select select-primary w-full max-w-xs" name="paymentMethod">
          <option disabled>Select Payment Methods</option>
          <option>Cash</option>
          <option>Venmo</option>
          <option>Cash & Venmo</option>
        </select>
      </div>

      <div className="stat-title text-info-content">Input Dates Available</div>
      <div aria-label='Input Dates Available'>
        <DatePicker multiple minDate={new Date().setDate(new Date().getDate() + 1)} plugins={[<DatePanel key='1' />]} value={dateValues} onChange={handleDateChange} />
      </div>
      <button onClick={addToy} className="btn btn-primary">Submit!</button>
    </div>
  );
};

export default AddToy;
