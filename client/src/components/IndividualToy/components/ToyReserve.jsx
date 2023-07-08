import React from 'react';
import swal from 'sweetalert';
import { verifySignedIn } from '../../../Firebase.js';

const ToyReserve = ({ toy, setPage, desktopMode }) => {
  const handlereserveClick = () => {
    if (!verifySignedIn()) {
      swal({
        title: 'Warning!',
        text: 'Please sign in to reserve a toy',
        icon: 'warning',
        button: 'OK'
      });
    } else {
      setPage(6);
    }
  };

  let nextDate = 'Unavailable';
  if (toy.next_date) {
    nextDate = new Date(toy.next_date).toLocaleString();
  }
  return (
    <div className={`bottom-0 w-screen ${desktopMode ? 'relative mx-auto max-w-[200px] rounded-b-lg' : 'fixed'}`}>
      <div className={`flex w-full px-4 py-5 bg-gray-950 bottom-0 fixed border-2 border-b-stone-600  ${desktopMode ? 'absolute' : 'fixed'}`}>
        <div data-testid='it-originPrice' className='mr-5 font-bold line-through text-red-700'>${toy.original_price}</div>
        <div data-testid='it-rentalPrice' className='font-bold text-green-100'>${toy.rental_price}/day</div>
       {toy.next_date ? <div data-testid='it-reserveButton' className={`btn-primary ml-auto bg-red-600 text-white ${desktopMode ? 'btn-xs rounded-md mb-8' : ' btn rounded-xl'}`} onClick={handlereserveClick}>Reserve</div> : null}
      </div>
      <div data-testid='it-next_date' className='font-extralight -translate-y-3.5 translate-x-4 text-white'>Next Available: {nextDate.split(',')[0]}</div>
    </div>
  );
};

export default ToyReserve;
