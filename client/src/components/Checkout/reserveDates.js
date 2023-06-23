import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../datePicker.css"; 

const ReserveDates = ({ toy_id }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    fetchAllDates();
  }, []);

  const fetchAllDates = async () => {
    try {
      const booked = await fetch('/bookings/getAllBooked', { method: 'POST', body: JSON.stringify({ toy_id }), headers: { 'Content-Type': 'application/json' } });
      const available = await fetch('/bookings/getAllAvailable', { method: 'POST', body: JSON.stringify({ toy_id }), headers: { 'Content-Type': 'application/json' } });

      const bookedDates = await booked.json();
      const availableDates = await available.json();

      setBookedDates(bookedDates.map(d => new Date(d.date)));
      setAvailableDates(availableDates.map(d => new Date(d.date)));
    } catch (err) {
      console.error(err);
    }
  };

  const isDateAvailable = (date) => {
    return availableDates.some(a => a.getDate() === date.getDate() && a.getMonth() === date.getMonth() && a.getFullYear() === date.getFullYear());
  };

  const isDateBooked = (date) => {
    return bookedDates.some(b => b.getDate() === date.getDate() && b.getMonth() === date.getMonth() && b.getFullYear() === date.getFullYear());
  };

  const highlightWithCSSClasses = (date) => {
    const cssClasses = {
      available: 'react-datepicker__day--available',
      booked: 'react-datepicker__day--booked',
      unavailable: 'react-datepicker__day--unavailable',
    };

    if (isDateAvailable(date)) return cssClasses.available;
    if (isDateBooked(date)) return cssClasses.booked;
    return cssClasses.unavailable;
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        highlightDates={[
          {
            "react-datepicker__day--available": availableDates,
            "react-datepicker__day--booked": bookedDates
          }
        ]}
        dayClassName={highlightWithCSSClasses}
      />
    </div>
  );
};

export default ReserveDates;
