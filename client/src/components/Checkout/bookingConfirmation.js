import React, { useState, useEffect } from "react";
import axios from 'axios';

function BookingConfirmation({ toyId, userId, toyUserId, selectedDates }) {
  const [toyData, setToyData] = useState(null);
  const [toyUserData, setToyUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const toyResponse = await axios.get(`/toy?toyId=${toyId}`);
        setToyData(toyResponse.data);

        const toyUserResponse = await axios.get(`/user?userId=${toyUserId}`);
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
      <h2>Booking Confirmation</h2>
      <p>Toy Name: {toyData.name}</p>
      <img src={toyData.image} alt={toyData.name} />
      <p>Owner of Toy: {toyUserData.name} (e-mail {toyUserData.email} to coordinate payment + pickup)</p>
      <p>Rental Price: ${toyData.rental_price} per day x {selectedDates.length} days = 
      <b>${toyData.rental_price * selectedDates.length}</b> </p>
      <p>Booked Dates:</p>
      <ul>
        {selectedDates.map((date, index) => <li key={index}>{date.toISOString().split('T')[0]}</li>)}
      </ul>
      <p>Total Price: ${toyData.rental_price * selectedDates.length}</p>
    </div>
  );
};

export default BookingConfirmation;
