import React from 'react';

const ToyReserve = ({ toy }) => {
  const options = { month: 'long', day: 'numeric', ordinal: 'auto' };

  const convertedDates = toy.dates.map(date => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', options);
  });

  return (
    <div className='bottom-0 fixed'>
      <div className='flex w-full px-4 py-5 bg-gray-950 bottom-0 fixed border-2 border-white'>
        <div className='mr-5 font-bold line-through text-red-700'>${toy.originalPrice}</div>
        <div className='font-bold text-green-100'>${toy.rentalPrice}/month</div>
        <div className='btn btn-primary ml-auto bg-red-600 text-white'>Reserve</div>
      </div>
      <div className='font-extralight -translate-y-3.5 translate-x-4'>{convertedDates[0]} - {convertedDates[convertedDates.length - 1]}</div>
    </div>
  );
};

export default ToyReserve;
