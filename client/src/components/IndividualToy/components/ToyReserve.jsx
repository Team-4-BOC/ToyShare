import React from 'react';

const ToyReserve = ({ toy }) => {
  const options = { month: 'long', day: 'numeric', ordinal: 'auto' };

  const convertedDates = toy.dates.map(date => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', options);
  });

  return (
    <div className='bg-gray-950 bottom-0 fixed w-full px-4 py-2'>
      <div className="flex">
        <div className="mr-5 font-bold line-through text-red-700">${toy.originalPrice}</div>
        <div className="font-bold">${toy.rentalPrice}</div>
        <div className="btn btn-primary ml-auto bg-red-600 text-white">Reserve</div>
      </div>
      <div className='font bold -translate-y-3'>{convertedDates[0]} - {convertedDates[convertedDates.length - 1]}</div>
    </div>
  );
};

export default ToyReserve;
