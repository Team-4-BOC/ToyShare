/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import DatePicker from 'react-multi-date-picker';
import CarouselEdit from './CarouselEdit.jsx';
import swal from 'sweetalert';

const EditToy = ({ toyId, userId, setPage, setToyId }) => {
  const [toyName, setToyName] = useState('');
  const [photos, setPhotos] = useState('');
  const [photoURLs, setPhotoURLs] = useState('');
  const [currentPhotoURLs, setCurrentPhotoURLs] = useState('');
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
    axios.get('toy', { params: { toyId: toyId, userId: userId } }) // Fix current user id and toy id
      .then((apiResults) => {
        const data = apiResults.data;
        setToyName(data.name);
        setCurrentPhotoURLs(data.photos);
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

  const deleteDates = () => {
    axios.delete('/toys/dates', { data: { toyId: toyId } })
      .catch((err) => { console.log(err); });
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
    const imageURLS = await uploadAllImages();
    await axios.post('/toys/photos', { toyId: toyId, photoURLs: imageURLS });
    await deleteDates();
    await axios.post('/toys/dates', { toyId: toyId, dates: datesFormatted });
    setEditSubmit(!editSubmit);
    setToyId(toyId);
    // eslint-disable-next-line no-undef
    swal({
      title: 'You Made Toy Edits!',
      text: 'You succesfully edited your toy!',
      icon: 'success',
      button: 'OK'
    })
      .then(() => {
        setPage(1);
      });
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

  const formatDates = (inputDates) => {
    const newDatesList = [];
    if (typeof inputDates[0] === 'string') {
      for (let i = 0; i < inputDates.length; i++) {
        const date = inputDates[i].slice(0, 10);
        newDatesList.push(date);
      }
    } else {
      for (let i = 0; i < inputDates.length; i++) {
        const date = `${inputDates[i].year}-${String(inputDates[i].month).padStart(2, '0')}-${String(inputDates[i].day).padStart(2, '0')}`;
        newDatesList.push(date);
      }
    }
    return newDatesList;
  };
  const getDates = () => {
    axios.get('/toys/dates', { params: { toyId: toyId } })
      .then((res) => {
        console.log(res.data[0].dates_array);
        const formattedDates = formatDates(res.data[0].dates_array);
        setDatesFormatted(formattedDates);
        setDateValues(res.data[0].dates_array);
      })
      .catch((err) => { console.log(err); });
  };

  const getOnePhotos = () => {
    axios.get('/toys/photos', { params: { toyId: toyId } })
      .then((results) => {
        const data = results.data;
        console.log('Image get');
        console.log(data[0].urls);
        setCurrentPhotoURLs(data[0].urls);
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
    selectedCategory: setSelectedCategoryId
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
  const deleteToy = () => {
    swal({
      title: 'Are you sure you want to delete this toy?',
      text: 'There is no undo button!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete('toys', { data: { toyId: toyId } })
            .then(() => {
              // getOnePhotos();
              swal('Poof! it has now been deleted', {
                icon: 'success'
              })
                .then(() => {
                  setPage(2);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          swal('Good thing you didn\'t click delete! The toy is still there.');
        }
      });
  };

  const handleDateChange = (inputDates) => {
    const newDatesList = formatDates(inputDates);
    setDatesFormatted(newDatesList);
    setDateValues(inputDates);
  };

  const handlePhotoUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    setPhotos(files);
  };

  return (
    <div className="flex items-center justify-center flex-col space-y-3 overflow-y-scroll">

      <CarouselEdit photoURLs={currentPhotoURLs} setSelectedPhoto={setSelectedPhoto} deletePhoto={deletePhoto}/>

      <div>Edit {toyName} </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Edit Toy Name</span>
        </label>
      <input onChange={handleChange} type="text" placeholder="Edit Toy Name" defaultValue={toyName} className="input input-bordered input-primary w-full max-w-xs" name="toyName" />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Edit Category</span>
        </label>
      <select onChange={handleChange} className="select select-primary w-full max-w-xs" name="selectedCategory">
        <option disabled selected>Select Toy Category</option>
       {selectedCategory
         ? currentCategories.map((category) => {
           if (category.name === selectedCategory) {
             return (<option selected key={category.id} data-key={category.id}> {category.name} </option>);
           } else {
             return (<option key={category.id} data-key={category.id}> {category.name} </option>);
           }
         })
         : null}
      </select>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Upload Toy Image</span>
        </label>
        <input onChange={handlePhotoUpload} type="file" accept="image/*" multiple="multiple" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" name="photos"/>
        <label className="label">
        </label>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Edit Original Price</span>
        </label>
      <input onChange={handleChange} type="text" placeholder="EditOriginal Price" defaultValue={originalPrice} className="input input-bordered input-primary w-full max-w-xs" name="originalPrice"/>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Edit Rental Price</span>
        </label>
      <input onChange={handleChange} type="text" placeholder="Edit Rental Price" className="input input-bordered input-primary w-full max-w-xs" defaultValue={rentalPrice} name="rentalPrice"/>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Edit Description</span>
        </label>
      <input onChange={handleChange} type="text" placeholder="Edit Description" className="input input-bordered input-primary w-full max-w-xs" defaultValue={description} name="description"/>
      </div>

      {deliveryMethod
        ? <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Edit Delivery Method</span>
        </label>
      <select onChange={handleChange} className="select select-primary w-full max-w-xs" defaultValue={deliveryMethod} name="deliveryMethod">
        <option disabled selected>Select Delivery Methods</option>
        <option>Pick Up</option>
        <option>Delivery</option>
        <option>Pick Up & Delivery</option>
      </select>
      </div>
        : null}
      {paymentMethod
        ? <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Edit Payment Method</span>
        </label>
      <select onChange={handleChange} className="select select-primary w-full max-w-xs" defaultValue={paymentMethod}name="paymentMethod">
        <option disabled selected>Select Payment Methods</option>
        <option>Cash</option>
        <option>Venmo</option>
        <option>Cash & Venmo</option>
      </select>
      </div>
        : null}
      <div className="stat-title text-info-content">Update Dates Available</div>
      <DatePicker multiple minDate={new Date().setDate(new Date().getDate() + 1)}plugins={[<DatePanel key='1' />]} value={dateValues} onChange={handleDateChange} />
      <div>
        <button className="btn btn-primary" onClick={editToy}>Submit Edits!</button>
        <button className="btn btn-secondary" onClick={deleteToy}>Delete Toy!</button>
      </div>
    </div>
  );
};

export default EditToy;
