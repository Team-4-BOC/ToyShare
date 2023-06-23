import React, { useState, useEffect } from 'react';

function UserToys ({ userData }) {
  return (
    <div className="user-toys">
      {/* //////// RENTAL INVENTORY LIST //////// */}
      <ul className="menu bg-base-200 w-56 rounded-box">
      <li>
        <h2 className="rental-inventory">Rental Inventory</h2>
        <ul>
        {userData.inventory.map(toy => <div key={toy.id}>• {toy.toy_name}</div>)}
        </ul>
      </li>
    </ul>
    {/* //////// CURRENTLY RENTING LIST //////// */}
    <ul className="menu bg-base-200 w-56 rounded-box">
      <li>
        <h2 className="rental-current">Currently Renting</h2>
        <ul>
          <li><a>• Item 1</a></li>
        </ul>
      </li>
    </ul>
    {/* //////// RENTAL HISTORY LIST //////// */}
    <ul className="menu bg-base-200 w-56 rounded-box">
      <li>
        <h2 className="rental-history">Rental History</h2>
        <ul>
        {userData.history.map(toy => <div key={toy.id}>• {toy.toy_name}</div>)}
        </ul>
      </li>
    </ul>
    {/* //////// SAVED TOYS LIST //////// */}
    <ul className="menu bg-base-200 w-56 rounded-box">
      <li>
        <h2 className="saved">Saved Toys</h2>
        <ul>
        {userData.saved.map(toy => <div key={toy.id}>• {toy.toy_name}</div>)}
        </ul>
      </li>
    </ul>
  </div>
  );
};

export default UserToys;
