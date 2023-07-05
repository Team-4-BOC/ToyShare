const sum = require('./example');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// import React from 'react';
// import { render, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import RenteeProfile from '../client/src/components/RenteeProfile/renteeProfile.jsx';

// describe('Rentee Profile', () => {
//   test('renders rentee info data', async () => {
//     const { getAllByTestId } = render(<RenteeProfile />);
//     const nameElement = getByTestId('rentee_name');
//     const descriptionElement = getAllByTestId('rentee_description');
//     const ratingElement = getAllByTestId('rentee_rating');
//     await waitFor(() => {
//       expect(nameElement).toBeInTheDocument();
//     });
//     // expect(descriptionElement).toBeInTheDocument();
//     // expect(ratingElement).toBeInTheDocument();
//   });

//   test('renders rentee photo image', () => {
//     const { getAllByTestId } = render(<RenteeProfile />);
//     const photos = getAllByTestId('rentee_photo');
//     expect(photos.length).toBe(1);
//   });
// });
