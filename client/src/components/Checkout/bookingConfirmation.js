import React, { useState, useEffect } from "react";

// page = 7

/**
 * todo: 
 *  - query component to get the user's data
 *  - if not queryable, is there a token in local storage ? 
 *      (client needs a reference to who's logged in)
 *  
 */
b
import getBooking from '../controllers/bookingData.js';
const getDummyData = getBooking; 

function BookingConfirmation() {
    const [checkoutData, setCheckoutData] = useState(null);

    useEffect(() => {
        // todo: replace with API call 
        const dummyData = getDummyData();
        setCheckoutData(dummyData);
    }, []);

    if (checkoutData === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Booking Confirmation</h2>

            <h3>User Info</h3>
            <p>Name: {checkoutData.user.first_name} {checkoutData.user.last_name}</p>

            <h3>Toy Info</h3>
            <img src={checkoutData.toy.toy_photos[0].url} alt={checkoutData.toy.toy_name} />
            <p>Name: {checkoutData.toy.toy_name}</p>
            <p>Description: {checkoutData.toy.toy_description}</p>
            <p>Rental Price: ${checkoutData.toy.rental_price} per day</p>

            <h3>Booking Info</h3>
            <p>Booked Dates:</p>
            <ul>
                {checkoutData.dates_booked.map((date, index) => <li key={index}>{date}</li>)}
            </ul>
            <p>Total Price: ${checkoutData.toy.rental_price * checkoutData.dates_booked.length}</p>
        </div>
    );
}

export default BookingConfirmation;
