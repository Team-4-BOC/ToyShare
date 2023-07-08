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
    <div>
      <h2>Booking Confirmation - Dates are reserved!</h2>
      <p><b>Toy Name:</b> {toyData.name}</p>
      <img src={toyData.photos[0]} alt={toyData.name} />
      <p><b>Owner of Toy:</b> {toyUserData[0].first_name}  {toyUserData[0].last_name} </p>
      <p><b>Payment & Pickup contact: <u> {toyUserData[0].email} </u></b></p>
      <p><b>Rental Price:</b> <u>${toyData.rental_price * selectedDates.length}</u> (${toyData.rental_price} per day x {selectedDates.length} days)
      </p>
      <p><b>Booked Dates:</b></p>
      <ul>
        {selectedDates.map((date, index) => <li key={index}>{date.toISOString().split('T')[0]}</li>)}
      </ul>
      <p><b>Total Price</b>: ${toyData.rental_price * selectedDates.length}</p>
      <a className="justify-between" onClick={() => setPage(0)}>
        <p>Please send payment of ${toyData.rental_price * selectedDates.length} and email {toyUserData[0].first_name} at <b><u>{toyUserData[0].email}</u></b> to finalize your rental and coordinate pickup in {toyUserData[0].city_state}. </p>
        <p></p>
        Click <b>here</b> to return to home page.
      </a>
    </div>
  );
}

export default BookingConfirmation;
