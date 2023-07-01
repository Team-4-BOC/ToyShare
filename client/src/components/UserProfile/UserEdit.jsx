import React, { useState } from 'react';
import axios from 'axios';

// This component allows the user to edit their user profile information
function UserEdit ({ getUserData, userData, setEnableEdit }) {
  const initialValues = {
    id: userData.user.id,
    first_name: userData.user.first_name,
    last_name: userData.user.last_name,
    city_state: userData.user.city_state,
    introduction: userData.user.introduction
  };

  const [photo, setPhoto] = useState('');
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
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
    const resultURL = [];
    resultURL.push(uploadImages(photo[0]));
    return Promise.all(resultURL);
  };

  const handlePhotoUpload = (e) => {
    e.preventDefault();
    const file = e.target.files;
    setPhoto(file);
    console.log(file);
  };

  const saveChanges = async () => {
    const imageURLS = await uploadAllImages();
    await axios.put('/user/photos', { id: userData.user.id, photoURL: imageURLS });
    await axios.put('/userpf', values);
    getUserData();
  };

  return (
  <div className="card card-compact w-80 bg-base-80 shadow-xl" style={{ marginTop: '152px' }}>
    <figure><img src={userData.photo} /></figure>
    <div className="card-body">
      <form>
        <label>
          Photo:
          <br></br>
          <input onChange={handlePhotoUpload} type="file" accept="image/*" multiple="multiple" className="file-input-xs file-input-bordered file-input-secondary w-full max-w-xs" name="photos"/>
          <br></br>
          First Name:
          <br></br>
          <input type="text" className="input input-bordered w-full max-w-xs" name="first_name" onChange={handleInputChange} defaultValue={ userData.user.first_name }/>
          <br></br>
          Last Name:
          <br></br>
          <input type="text" className="input input-bordered w-full max-w-xs" name="last_name" onChange={handleInputChange} defaultValue={ userData.user.last_name }/>
          <br></br>
          City, State:
          <br></br>
          <input type="text" className="input input-bordered w-full max-w-xs" name="city_state" onChange={handleInputChange} defaultValue={ userData.user.city_state }/>
          <br></br>
          Introduction:
          <br></br>
          <textarea type="text" className="input input-bordered w-full max-w-xs" name="introduction" onChange={handleInputChange} defaultValue={ userData.user.introduction }/>
        </label>
      </form>
      <div className="card-actions justify-end">
      </div>
      <button onClick={() => { saveChanges(); setEnableEdit(false); }} className="btn-sm" style={{ fontSize: 12, textAlign: 'right' }}>Save Changes</button>
    </div>
  </div>
  );
};

export default UserEdit;
