import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles.css";

const DatePickerComponent = ({ toy_id }) => {
  const [startDate, setStartDate] = useState(new Date());
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
  
  const isDateSelected = (date) => {
    return selectedDates.some(s => s.getDate() === date.getDate() && s.getMonth() === date.getMonth() && s.getFullYear() === date.getFullYear());
  }

  const isDateAvailable = (date) => {
    return availableDates.some(a => a.getDate() === date.getDate() && a.getMonth() === date.getMonth() && a.getFullYear() === date.getFullYear());
  };

  const isDateBooked = (date) => {
    return bookedDates.some(b => b.getDate() === date.getDate() && b.getMonth() === date.getMonth() && b.getFullYear() === date.getFullYear());
  };

  const handleDateChange = (date) => {
    if(isDateAvailable(date)) {
      if(isDateSelected(date)) {
        setSelectedDates(selectedDates.filter(selectedDate => selectedDate.getTime() !== date.getTime()));
      } else {
        setSelectedDates([...selectedDates, date]);
      }
    }
    setStartDate(date);
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

  const highlightWithCSSClasses = (date) => {
    const cssClasses = {
      available: 'react-datepicker__day--available',
      booked: 'react-datepicker__day--booked',
      selected: 'react-datepicker__day--selected',
      unavailable: 'react-datepicker__day--unavailable',
    };

    if (isDateSelected(date)) return cssClasses.selected;
    if (isDateAvailable(date)) return cssClasses.available;
    if (isDateBooked(date)) return cssClasses.booked;
    return cssClasses.unavailable;
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        highlightDates={[
          {
            "react-datepicker__day--available": availableDates,
            "react-datepicker__day--booked": bookedDates,
            "react-datepicker__day--selected": selectedDates  
          }
        ]}
        dayClassName={highlightWithCSSClasses}
      />
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
