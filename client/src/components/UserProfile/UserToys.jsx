import React, { useState, useEffect } from 'react';

function UserToys ({ userData }) {
  const titleStyle = {
    fontSize: 20,
    fontWeight: 'bold'
  };
  return (
    <div className="user-toys">
      {/* //////// RENTAL INVENTORY LIST //////// */}
      <ul className="menu bg-base-200 w-100 rounded-box">
      <li>
        <h2 className="rental-inventory" style={titleStyle}>Rental Inventory</h2>
        <ul>
        {userData.inventory.map(toy => <div key={toy.id}>• {toy.toy_name}</div>)}
        </ul>
      </li>
      <button className="btn-sm" style={{ fontSize: 12, textAlign: 'right' }}>Add/Edit Toys</button>
    </ul>
    <br></br>
    {/* //////// CURRENTLY RENTING LIST -- excluding for now //////// */}
    {/* //////// RENTAL HISTORY LIST //////// */}
    <ul className="menu bg-base-200 w-100 rounded-box">
      <li>
        <h2 className="rental-history" style={titleStyle}>Rental History</h2>
        <ul>
        {userData.history.map(toy => <div key={toy.id}>• {toy.toy_name}</div>)}
        </ul>
      </li>
    </ul>
    <br></br>
    {/* //////// SAVED TOYS LIST //////// */}
    <ul className="menu bg-base-200 w-100 rounded-box">
      <li>
        <h2 className="saved" style={titleStyle}>Saved Toys</h2>
        <ul>
        {userData.saved.map(toy => <div key={toy.id}>• {toy.toy_name}</div>)}
        </ul>
      </li>
    </ul>
  </div>
  );
};

export default UserToys;
