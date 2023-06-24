import React, { useState, useEffect } from "react";

const DatePickerComponent = ({ toy_id }) => {
  const [bookedDates, setBookedDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]); 

  useEffect(() => {
    fetchAllDates();
  }, []);

  const fetchAllDates = async () => {
    try {
      const bookedRes = await fetch('/bookings/getAllBooked', { method: 'POST', body: JSON.stringify({ toy_id }), headers: { 'Content-Type': 'application/json' } });
      const availableRes = await fetch('/bookings/getAllAvailable', { method: 'POST', body: JSON.stringify({ toy_id }), headers: { 'Content-Type': 'application/json' } });

      const bookedDays = await bookedRes.json();
      const availableDays = await availableRes.json();

      setBookedDates(bookedDays.map(d => new Date(d.date)));
      setAvailableDates(availableDays.map(d => new Date(d.date)));

    } catch (err) {
      console.error(err);
    }
  };

  const handleDateSelect = (date) => {
    if (selectedDates.some(selectedDate => selectedDate.getTime() === date.getTime())) {
      setSelectedDates(selectedDates.filter(selectedDate => selectedDate.getTime() !== date.getTime()));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  }

  const handleReserve = async () => {
    try {
      // Call route to update availability/booking status
      await fetch('/bookings/updateBooking', {
        method: 'PUT',
        body: JSON.stringify({ toy_id, dates: selectedDates.map(date => date.toISOString()) }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Call route to add to inventory
      await fetch('/inventory/add', {
        method: 'POST',
        body: JSON.stringify({ user_id: owner_id, toy_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Call route to add to rental history
      await fetch('/rental/add', {
        method: 'POST',
        body: JSON.stringify({ user_id, toy_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Clear selected dates
      setSelectedDates([]);
  
      // Refetch all dates
      fetchAllDates();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      Available dates:
      <ul>
        {availableDates.map(date => (
          <li key={date.getTime()}>
            <label>
              <input type="checkbox" checked={selectedDates.some(selectedDate => selectedDate.getTime() === date.getTime())} onChange={() => handleDateSelect(date)} />
              {date.toLocaleDateString()}
            </label>
          </li>
        ))}
      </ul>
      <hr />
      Selected dates:
      <ul>
        {selectedDates.map(date => <li key={date.getTime()}>{date.toLocaleDateString()}</li>)} 
      </ul>
      <button onClick={handleReserve}>Reserve</button>
    </div>
  );
};

export default DatePickerComponent;
