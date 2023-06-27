import React from 'react';

const RenteeInventory = ({ inventoryData }) => {
  const titleStyle = {
    fontSize: 20,
    fontWeight: 'bold'
  };
  return (
    <div className="user-toys">
      <ul className="menu bg-base-200 w-100 rounded-box">
        <li>
          <h2 className="rental-inventory" style={titleStyle}>Rental Inventory</h2>
          <ul>
          {inventoryData.map(toy => <div key={toy.id}>• {toy.toy_name}</div>)}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default RenteeInventory;
