import React, { useState } from 'react';

// This component allows the user to edit their user profile information
function UserEdit ({ userData, setEnableEdit }) {
  const initialValues = {
    first_name: userData.user.first_name,
    last_name: userData.user.last_name,
    city_state: userData.user.city_state,
    introduction: 'Proud parent of amazing kids. Check out my inventory of toys for rental!'
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  return (
  <div className="card card-compact w-80 bg-base-80 shadow-xl" style={{ marginTop: '152px' }}>
    <figure><img src={userData.photo} /></figure>
    <div className="card-body">
      <form>
        <label>
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
          <textarea type="text" className="input input-bordered w-full max-w-xs" name="introduction" defaultValue='Proud parent of amazing kids. Check out my inventory of toys for rental!'/>
        </label>
      </form>
      <div className="card-actions justify-end">
      </div>
      <button onClick={() => setEnableEdit(false)} className="btn-sm" style={{ fontSize: 12, textAlign: 'right' }}>Save Changes</button>
    </div>
  </div>
  );
};

export default UserEdit;
