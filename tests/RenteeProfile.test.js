// import {rest} from 'msw'
// import {setupServer} from 'msw/node'
// import Fetch from '../fetch'
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RenteeInfo from '../client/src/components/RenteeProfile/RenteeInfo.jsx';
import RenteeInventory from '../client/src/components/RenteeProfile/RenteeInventory.jsx';
// import RenteeProfile from '../client/src/components/RenteeProfile/renteeInventory.jsx';

const renteeData = {
  inventory: [
    {
      category_id: 2, delivery_method: 'Ship', id: 3, original_price: '20', payment_method: 'Cash,Venmo', rating: 3, rental_price: '3', toy_description: 'A fun toy', toy_name: 'Boba Fett', user_id: 3
    }
  ],
  photo: 'https://upload.wikimedia.org/wikipedia/commons/thu…g/640px-Jake_Gyllenhaal_2019_by_Glenn_Francis.jpg',
  user: {
    city_state: 'San Jose, CA',
    email: 'jjones11@email.com',
    first_name: 'Jake',
    id: 3,
    introduction: 'Hi im an introduction',
    last_name: 'Jones',
    lat_lng: '9.932543,-84.079578',
    signed_in: false
  }
};
// const server = setupServer(
//   rest.get('/renteepf', (req, res, ctx) => {
//     return res(ctx.json(renteeData));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

describe('Rentee Information Component', () => {
  test('Checks if rentee elements rendered', async () => {
    const { getAllByTestId } = render(<RenteeInfo renteeData={renteeData}/>);
    const nameElement = await getAllByTestId('rentee_name')[0];
    const descriptionElement = await getAllByTestId('rentee_description')[0];
    const ratingElement = await getAllByTestId('rentee_rating')[0];
    expect(descriptionElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });

  test('Checks if rentee first and last name is in the document', async () => {
    const { getAllByText } = render(<RenteeInfo renteeData={renteeData}/>);
    const firstName = await getAllByText(/Jake/)[0];
    const lastName = await getAllByText(/Jones/)[0];
    expect(lastName).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
  });

  test('Checks if rentee location and description is in the document', async () => {
    const { getAllByText } = render(<RenteeInfo renteeData={renteeData}/>);
    const location = await getAllByText(/San Jose, CA/)[0];
    const description = await getAllByText(/Proud parent of amazing kids. Check out my inventory of toys for rental!/)[0];
    expect(location).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});

describe('Rentee Inventory Component', () => {
  test('Checks if renteeIventory photos renders', () => {
    const { getAllByTestId } = render(<RenteeInventory inventoryData={renteeData.inventory}/>);
    const photos = getAllByTestId('rentee_toys');
    expect(photos.length).toBe(1);
  });

  test('Checks if renteeIventory page renders', async () => {
    const { getAllByText } = render(<RenteeInventory inventoryData={renteeData.inventory}/>);
    const title = await getAllByText(/Rental Inventory/)[0];
    expect(title).toBeInTheDocument();
  });
  test('Checks if correct toy renders', async () => {
    const { getAllByText } = render(<RenteeInventory inventoryData={renteeData.inventory}/>);
    const toyName = await getAllByText(/Boba Fett/)[0];
    expect(toyName).toBeInTheDocument();
  });
});
