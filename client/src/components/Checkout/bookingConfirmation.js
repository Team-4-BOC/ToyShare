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
        first_name: 'Ben',
        last_name: 'Block'
    };
    const toy = {
        toy_photos: [
            {
                url: 'https://images.squarespace-cdn.com/content/v1/5943b11db3db2be040e6fa54/1521785280031-WSCUN2QOVEFM6YN0TMUC/logic-rubiks-cube.jpg'
            },
            {
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkgI-QflIkfGckuPj4q9kZ9fjHkf-CFKOFQH3hb8P9Xo93aDvNZNdz5Vz7VEV4Hu92hg5YSb02rZg&usqp=CAU&ec=48665701'
            }
        ],
        toy_name: 'Rubics Cube',
        rental_price: 5
    }
    const dates_booked = [
        'Sunday, June 25',
        'Monday, June 26',
        'Tuesday, June 27',
        'Wednesday, June 28',
        'Thursday, June 29',
        'Friday, June 30',
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
