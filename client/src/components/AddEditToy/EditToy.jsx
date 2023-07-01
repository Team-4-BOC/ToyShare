/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import PhotoCarousel from '../IndividualToy/components/PhotoCarousel.jsx';
import axios from 'axios';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import DatePicker from 'react-multi-date-picker';
import CarouselEdit from './CarouselEdit.jsx';

const EditToy = ({ toyId, userId }) => {
  const [toyName, setToyName] = useState('');
  const [photos, setPhotos] = useState('');
  const [photoURLs, setPhotoURLs] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [dateValues, setDateValues] = useState();
  const [datesFormatted, setDatesFormatted] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedURL, setSelectedURL] = useState('');
  const [editSubmit, setEditSubmit] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');


  const fetchToy = () => {
    axios.get('toy', { params: { toyId: toyId, current_user_id: userId } }) // Fix current user id and toy id
      .then((apiResults) => {
        const data = apiResults.data;
        setToyName(data.name);
        setPhotoURLs(data.photos);
        setOriginalPrice(data.original_price);
        setRentalPrice(data.rental_price);
        setDescription(data.description);
        setDeliveryMethod(data.delivery_method);
        setPaymentMethod(data.payment_method);
      })
      .catch((err) => {
        console.log('EROR fetching toy: ', err);
      });
  };
  const editToy = async () => {
    await axios.put('/toys', {
      toy_name: toyName,
      category_id: selectedCategoryId,
      toy_description: description,
      original_price: originalPrice,
      rental_price: rentalPrice,
      delivery_method: deliveryMethod,
      payment_method: paymentMethod,
      toyId: toyId
    });
    // const imageURLS = await uploadAllImages();
    // await axios.post('/toys/photos', { toyId: toyId, photoURLs: imageURLS });
    // await axios.post('/toys/dates', { toyId: toyId, dates: datesFormatted });
    setEditSubmit(!editSubmit);
    // eslint-disable-next-line no-undef
    alert('Toy Updated!');
  };
  const getCategories = () => {
    axios.get('/toys/category')
      .then((res) => {
        setCurrentCategories(res.data);
      })
      .catch((err) => { console.log(err); });
  };
  const getSelectedCategory = () => {
    axios.get('/toys/category', { params: { toyId: toyId } })
      .then((res) => {
        setSelectedCategoryId(res.data[0].id);
        setSelectedCategory(res.data[0].name);
      })
      .catch((err) => { console.log(err); });
  };

  const getDates = () => {
    axios.get('/toys/dates', { params: { toyId: toyId } })
      .then((res) => {
        console.log(res.data[0].dates_array);
        setDateValues(res.data[0].dates_array);
      })
      .catch((err) => { console.log(err); });
  };
  const getOnePhotos = () => {
    axios.get('/toys/photos', { params: { toyId: toyId } })
      .then((results) => {
        const data = results.data;
        console.log(data);
        setPhotoURLs(results.data);
      });
  };
  const deletePhoto = () => {
    console.log('Selected Photo', selectedPhoto);
    axios.delete('toys/photos', { data: { url: selectedPhoto, toyId: toyId } })
      .then(() => {
        getOnePhotos();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchToy();
    getCategories();
    getDates();
    getSelectedCategory();
  }, []);

  useEffect(() => {
    fetchToy();
    getCategories();
    getDates();
    getSelectedCategory();
  }, [editSubmit]);

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

  console.log('GIVE ME PHOTOS', photoURLs);
  return (
    <div className="flex items-center justify-center flex-col space-y-3 overflow-y-scroll">
      <CarouselEdit photoURLs={photoURLs} setSelectedPhoto={setSelectedPhoto} deletePhoto={deletePhoto}/>
      <div>Edit {toyName} </div>
      <input onChange={handleChange} type="text" placeholder="Edit Toy Name" defaultValue={toyName} className="input input-bordered input-primary w-full max-w-xs" name="toyName" />
      <select onChange={handleChange} className="select select-primary w-full max-w-xs" name="selectedCategory">
        <option disabled selected>Select Toy Category</option>
       {selectedCategory
         ? currentCategories.map((category) => {
           if (category.name === selectedCategory) {
             return (<option selected key={category.id} data-key={category.id}> {category.name} </option>);
           } else {
             return (<option key={category.id} data-key={category.id}> {category.name} </option>);
           }
         }
         )
         : null}
      </select>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Upload Toy Image</span>
        </label>
        <input onChange={handleChange} type="file" multiple="multiple" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" name="photos"/>
        <label className="label">
        </label>
      </div>
      <input onChange={handleChange} type="text" placeholder="EditOriginal Price" defaultValue={originalPrice} className="input input-bordered input-primary w-full max-w-xs" name="originalPrice"/>
      <input onChange={handleChange} type="text" placeholder="Edit Rental Price" className="input input-bordered input-primary w-full max-w-xs" defaultValue={rentalPrice} name="rentalPrice"/>
      <input onChange={handleChange} type="text" placeholder="Edit Description" className="input input-bordered input-primary w-full max-w-xs" defaultValue={description} name="description"/>
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
      <div className="stat-title text-info-content">Update Dates Available</div>
      <DatePicker multiple minDate={new Date().setDate(new Date().getDate() + 1)}plugins={[<DatePanel key='1' />]} value={dateValues} onChange={handleDateChange} />
      <div>
        <button className="btn btn-primary" onClick={editToy}>Submit Edits!</button>
        <button className="btn btn-secondary" onClick={(event) => {
          // eslint-disable-next-line no-undef
          confirm('Are you sure?');
        }}>Delete Toy!</button>
      </div>
    </div>
  );
};

export default EditToy;
