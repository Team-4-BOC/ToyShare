import React, { useState, useEffect } from "react";
import axios from 'axios';

const ReserveDates = ({ setPage, toyId, toyUserId, userId }) => {
  //const [bookedDates, setBookedDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    fetchAllDates();
  }, []);

  const fetchAllDates = async () => {
    try {
      const response = await axios.get(`/bookings/getAllAvailable?toyId=${toyId}`)
      const dates = response.data.map(row => row.dates);
      setAvailableDates(dates);
    } catch (err) {
      console.error('ERROR grabbing dates available: ', err);
    }
  };


  const handleDateSelect = (date) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter(selectedDate => selectedDate !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  }

  const handleReserve = async () => {
    try {
      const dates = selectedDates;
      // Update availability/booking status
      try {
        await axios.put('/bookings/updateStatus', { toyId, dates });
      } catch (err) {
        console.log('ERROR updating booking status: ', err);
      }

      // Add to inventory_out
      try {
        await axios.post('/bookings/postInventory', { toyUserId, toyId });
      } catch (err) {
        console.log('ERROR adding to inventory: ', err);
      }

      // Add to rental_history
      try {
        await axios.post('/bookings/postRental', { userId, toyId });
      } catch (err) {
        console.log('ERROR adding to rental history: ', err);
      }
      // // add to inventory
      // await axios.post('/inventory/add',
      //   { user_id: owner_id, toy_id },
      //   { headers: { 'Content-Type': 'application/json' } }
      // );

      // // add to rental history
      // await axios.post('/rental/add',
      //   { user_id, toy_id },
      //   { headers: { 'Content-Type': 'application/json' } }
      // );


      // Clear selected dates
      setSelectedDates([]);

      // Refetch all dates?
      // fetchAllDates();

      // switch to payment page
      setPage(7);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      Available dates:
      <ul>
        {availableDates.map(date => (
          <li key={date}>
            <label>
              <input type="checkbox" checked={selectedDates.includes(date)} onChange={() => handleDateSelect(date)} />
              {date}
            </label>
          </li>
        ))}
      </ul>
      <hr />
      Selected dates:
      <ul>
        {selectedDates.map(date => <li key={date}>{date}</li>)}
      </ul>
      <button onClick={handleReserve}>Book above dates</button>
    </div>
  );
};

export default ReserveDates;
