import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWithinInterval,
  isBefore,
  isAfter,
  getDay,
  isToday,
  isSameDay,
  addMonths,
} from 'date-fns';

const ReserveDates = ({ setPage, toyId, toyUserId, userId, setSelectedDates, selectedDates,}) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const fetchAllDates = async () => {
    try {
      const response = await axios.get(`/bookings/getAllAvailable?toyId=${toyId}`);
      const dates = response.data.map((row) => new Date(row.dates));
      setAvailableDates(dates);
    } catch (err) {
      console.error('ERROR grabbing dates available: ', err);
    }
  };

  const fetchBookedDates = async () => {
    try {
      const response = await axios.get(`/bookings/getAllBooked?toyId=${toyId}`);
      const dates = response.data.map((row) => new Date(row.dates));
      setBookedDates(dates);
    } catch (err) {
      console.error('ERROR grabbing booked dates: ', err);
    }
  };

  const handleReserve = async () => {
    try {
      const dates = selectedDates.map((date) => format(date, 'yyyy-MM-dd'));
      await axios.put('/bookings/updateStatus', { toyId, dates });
      await axios.post('/bookings/postInventory', { toyUserId, toyId });
      await axios.post('/bookings/postRental', { userId, toyId });
      setPage(7);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (isBefore(date, startDate)) {
      setEndDate(startDate);
      setStartDate(date);
    } else {
      const datesRange = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(date),
      });
      if (
        datesRange.every((d) =>
          availableDates.some((a) => isSameDay(a, resetTime(d)))
        )
      ) {
        setEndDate(date);
        setErrorMessage('');
      } else {
        setStartDate(null);
        setEndDate(null);
        setErrorMessage(
          'Your selected range included unavailable dates; each pick-up and return is considered a single booking.'
        );
      }
    }
  };

  const resetTime = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  useEffect(() => {
    fetchAllDates();
    fetchBookedDates();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const datesRange = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate),
      });
      setSelectedDates(datesRange);
    }
  }, [startDate, endDate]);

  const currentDate = new Date();
  const monthsToRender = [];
  const revenueNow = 3;
  for (let i = 0; i < revenueNow; i++) {
    const monthStart = startOfMonth(addMonths(currentDate, i));
    const monthEnd = endOfMonth(addMonths(currentDate, i));
    const datesInMonth = eachDayOfInterval({
      start: monthStart,
      end: monthEnd,
    });

    const leadingSpaces = Array(getDay(monthStart)).fill(null);
    const trailingSpaces = Array(6 - getDay(monthEnd)).fill(null);

    const datesToRender = [...leadingSpaces, ...datesInMonth, ...trailingSpaces];
    monthsToRender.push({ monthStart, datesToRender });
  }

  return (
    <div>
      {monthsToRender.map(({ monthStart, datesToRender }) => (
        <div key={monthStart.getTime()}>
          <h2>{format(monthStart, 'MMMM yyyy')}</h2>
          <div style={{ display: 'flex' }}>
            {daysOfWeek.map((day) => (
              <div
                style={{ flex: '1 0 14%', textAlign: 'center' }}
                key={day}
              >
                {day}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {datesToRender.map((day, i) => {
              if (day !== null) {
                const isInDatabase =
                  day &&
                  (availableDates.some((availableDate) =>
                    isWithinInterval(day, {
                      start: availableDate,
                      end: availableDate,
                    })
                  ) ||
                    bookedDates.some((bookedDate) =>
                      isWithinInterval(day, {
                        start: bookedDate,
                        end: bookedDate,
                      })
                    ));
                const isAvailable =
                  day &&
                  availableDates.some((availableDate) =>
                    isWithinInterval(resetTime(day), {
                      start: resetTime(availableDate),
                      end: resetTime(availableDate),
                    })
                  );
                const isBooked =
                  day &&
                  bookedDates.some((bookedDate) =>
                    isWithinInterval(resetTime(day), {
                      start: resetTime(bookedDate),
                      end: resetTime(bookedDate),
                    })
                  );

                const isPast = day && (isBefore(day, new Date()) || isToday(day));
                const isSelected =
                  day &&
                  ((startDate &&
                    isWithinInterval(day, {
                      start: startDate,
                      end: startDate,
                    })) ||
                    (endDate &&
                      isWithinInterval(day, {
                        start: endDate,
                        end: endDate,
                      })) ||
                    (startDate &&
                      endDate &&
                      isAfter(day, startDate) &&
                      isBefore(day, endDate)));
                const isDisabled = !day || !isInDatabase || isBooked || isPast;
                return (
                  <button
                    key={i}
                    onClick={() => !isDisabled && handleSelect(day)}
                    style={{
                      textDecoration: isBooked ? 'line-through' : 'none',
                      backgroundColor: isSelected
                        ? 'blue'
                        : isDisabled
                          ? 'lightgray'
                          : 'white',
                      color: isDisabled ? 'gray' : 'black',
                      border: '1px solid black',
                      margin: '1px',
                      flex: '1 0 14%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                    }}
                    disabled={isDisabled}
                  >
                    {day.getDate()}
                  </button>
                );
              } else {
                return (
                  <button
                    key={i}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid black',
                      margin: '1px',
                      flex: '1 0 14%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                    }}
                    disabled={true}
                  ></button>
                );
              }
            })}
          </div>
        </div>
      ))}
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={handleReserve}>Book Selected Dates</button>
    </div>
  );
};

export default ReserveDates;
