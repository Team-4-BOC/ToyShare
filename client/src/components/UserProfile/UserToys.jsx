import React from 'react';

// This component displays the user's rental inventory, rental history, and saved toys
function UserToys ({ userData, setPage, toyId, setToyId }) {
  const titleStyle = {
    fontSize: 20,
    fontWeight: 'bold'
  };
  return (
    <div className="user-toys">
      {/* //////// RENTAL INVENTORY LIST //////// */}
      <ul className="menu bg-secondary bg-base-200 w-100 rounded-box">
      <li>
        <h2 className="rental-inventory" style={titleStyle}>Rental Inventory <button onClick={() => { setPage(4); }} className="btn-sm">Add toy</button></h2>
        <ul>
        {userData.inventory.map(toy => <div className="toy-line" key={toy.id}><span className="toy-name" onClick={() => { setToyId(toy.id); setPage(1); }} >• {toy.toy_name}</span><button onClick={() => { setToyId(toy.id); setPage(5); }} className="btn-sm">Edit</button></div>)}
        </ul>
      </li>
    </ul>
    <br></br>
    {/* //////// CURRENTLY RENTING LIST -- excluding for now //////// */}
    {/* //////// RENTAL HISTORY LIST //////// */}
    <ul className="menu bg-secondary bg-base-200 w-100 rounded-box">
      <li>
        <h2 className="rental-history" style={titleStyle}>Rental History</h2>
        <ul>
        {userData.history.map(toy => <div onClick={() => { setToyId(toy.id); setPage(1); }} key={toy.id}>• {toy.toy_name}</div>)}
        </ul>
      </li>
    </ul>
    <br></br>
    {/* //////// SAVED TOYS LIST //////// */}
    <ul className="menu bg-secondary bg-base-200 w-100 rounded-box">
      <li>
        <h2 className="saved" style={titleStyle}>Saved Toys</h2>
        <ul>
        {userData.saved.map(toy => <div onClick={() => { setToyId(toy.id); setPage(1); }} key={toy.id}>• {toy.toy_name}</div>)}
        </ul>
      </li>
    </ul>
  </div>
  );
};

export default UserToys;
