import React from 'react';

const ToyReserve = ({ toy, setPage }) => {
  const nextDate = new Date(toy.next_date).toLocaleString();
  return (
    <div className='bottom-0 fixed'>
      <div className='flex w-full px-4 py-5 bg-gray-950 bottom-0 fixed border-2 border-b-stone-600'>
        <div data-testid='it-originPrice' className='mr-5 font-bold line-through text-red-700'>${toy.original_price}</div>
        <div data-testid='it-rentalPrice' className='font-bold text-green-100'>${toy.rental_price}/month</div>
        <div data-testid='it-reserveButton' className='rounded-xl btn btn-primary ml-auto bg-red-600 text-white' onClick={() => setPage(6)}>Reserve</div>
      </div>
      <div data-testid='it-next_date' className='font-extralight -translate-y-3.5 translate-x-4 text-white'>Next Available: {nextDate.split(',')[0]}</div>
    </div>
  );
};

export default ToyReserve;
