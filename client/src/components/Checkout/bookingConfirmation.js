import React, { useState, useEffect } from "react";

/**
 * todo: 
 *  - query component to get the user's data
 *  - if not queryable, is there a token in local storage ? 
 *      (client needs a reference to who's logged in)
 *  
 */

function getDummyData() {
    const user = {
        first_name: 'Nick',
        last_name: 'Mann'
    };
    const toy = {
        toy_photos: [
            {
                url: 'https://place-puppy.com/200x200'
            },
            {
                url: 'https://place-puppy.com/201x201'
            }
        ],
        toy_name: 'a puppy',
        rental_price: 20
    }
    const dates_booked = [
        'Thursday, June 22', 
        'Friday, June 23'
    ]
    const checkoutData = {
        user, 
        toy,
        dates_booked
    }
    return checkoutData;
}

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
