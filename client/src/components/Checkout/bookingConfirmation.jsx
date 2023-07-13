import React, { useState, useEffect } from "react";
import axios from 'axios';

function BookingConfirmation({ toyId, userId, toyUserId, selectedDates, setPage }) {
  const [toyData, setToyData] = useState(null);
  const [toyUserData, setToyUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const toyResponse = await axios.get(`/toy?toyId=${toyId}`);
        setToyData(toyResponse.data);

        const intToyUserId = Math.abs(toyUserId);
        const toyUserResponse = await axios.get(`/user?id=${intToyUserId}`);
        setToyUserData(toyUserResponse.data);

      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };
    fetchData();
  }, [toyId, toyUserId]);

  if (!toyData || !toyUserData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold mb-4">Booking Confirmation - Dates are reserved!</h2>
      <p className="mb-2"><b>Toy Name:</b> {toyData.name}</p>
      <img className="mb-4 rounded-lg shadow-lg" src={toyData.photos[0]} alt={toyData.name} />
      <p><b>Owner of Toy:</b> {toyUserData[0].first_name} {toyUserData[0].last_name}</p>
      <p><b>Payment & Pickup contact:</b> <a className="underline" href={`mailto:${toyUserData[0].email}`}>{toyUserData[0].email}</a></p>
      <p className="mb-2"><b>Rental Price:</b> <span className="underline">${toyData.rental_price * selectedDates.length}</span> (${toyData.rental_price} per day x {selectedDates.length} days)</p>
      <p><b>Booked Dates:</b></p>
      <ul className="list-disc list-inside">
        {selectedDates.map((date, index) => <li key={index}>{date.toISOString().split('T')[0]}</li>)}
      </ul>
      <p className="mb-4"><b>Total Price:</b> ${toyData.rental_price * selectedDates.length}</p>
      <div className="btn-primary bg-primary-500 text-black font-bold py-2 px-4 rounded" onClick={() => setPage(0)}>
        <p className="mb-2">Please send payment of ${toyData.rental_price * selectedDates.length} and email {toyUserData[0].first_name} at <b className="underline">{toyUserData[0].email}</b> to finalize your rental and coordinate pickup in {toyUserData[0].city_state}. </p>
        <p className="mt-2">Click <b>here</b> to return to home page.</p>
      </div>
    </div>
);

}

export default BookingConfirmation;
