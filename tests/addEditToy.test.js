// import React from 'react';
// import {rest} from 'msw';
// import {setupServer} from 'msw/node';
// import { render, screen, fireEvent} from '@testing-library/react';
// import AddToy from '../client/src/components/AddEditToy/AddToy.jsx';
// import '@testing-library/jest-dom';

// // import App from '../client/src/App.jsx';

// // const server = setupServer(
// //   rest.get('/')
// // )

// describe('Add Toy Component Unit Tests', () => {
//   beforeEach(async () => {
//     await render(<AddToy/>);
//   });
//   // it('Renders the AddToy Component', () => {
//   //   render(<AddToy />);
//   // });
//   it('Renders the input element Add Toy Name', () => {
//     // render(<AddToy />);
//     expect(screen.getByLabelText('Add Toy Name')).toBeInTheDocument();
//   });
//   it('Renders the select element Select Toy Category', () => {
//     // render(<AddToy />);
//     expect(screen.getByLabelText('Select Toy Category')).toBeInTheDocument();
//   });
//   // it('Renders the input element Add Original Price', () => {
//   //   expect(screen.getByLabelText('Add Original Price')).toBeInTheDocument();
//   // });
//   // it('Renders the input element Add Rental Price', () => {
//   //   expect(screen.getByLabelText('Add Rental Price')).toBeInTheDocument();
//   // });
//   // it('Renders the input element Add Description', () => {
//   //   expect(screen.getByLabelText('Add Description')).toBeInTheDocument();
//   // });
//   // it('Renders the select element Select Delivery Methods', () => {
//   //   expect(screen.getByLabelText('Select Delivery Methods')).toBeInTheDocument();
//   // });
//   // it('Renders the select element Select Payment Methods', () => {
//   //   expect(screen.getByLabelText('Select Payment Methods')).toBeInTheDocument();
//   // });
//   // it('Renders the div element for Inputting Dates', () => {
//   //   expect(screen.getByLabelText('Input Dates Available')).toBeInTheDocument();
//   // });
//   // it('Renders the submit button', () => {
//   //   expect(screen.getByLabelText('SUBMIT!')).toBeInTheDocument();
//   // });
// });

const sum = require('./example');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

