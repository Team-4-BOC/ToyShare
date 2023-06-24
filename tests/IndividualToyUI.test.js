import React from 'react';
import { render } from '@testing-library/react';
import IndividualToy from '../client/src/components/IndividualToy/IndividualToy.jsx';

import '@testing-library/jest-dom';

describe('IndividualToy Given Temp Data', () => { // Lots more to do
  test('renders toy name and rating', () => {
    const { getByTestId } = render(<IndividualToy />);
    const nameElement = getByTestId('it-toy-name');
    const ratingElement = getByTestId('stars');
    expect(nameElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
  });

  test('renders photo carousel images', () => {
    const { getAllByTestId } = render(<IndividualToy />);
    const photos = getAllByTestId('it-photo');
    expect(photos.length).toBe(3);
  });

  test('renders toy info data', () => {
    const { getByTestId } = render(<IndividualToy />);
    const location = getByTestId('it-location');
    const user = getByTestId('it-user');
    const distance = getByTestId('it-distance');
    const map = getByTestId('it-map');
    const description = getByTestId('it-description');

    const elements = [location, user, distance, map, description];

    elements.forEach((curElem) => {
      expect(curElem).toBeInTheDocument();
    });
  });

  test('renders toy reservation data', () => {
    const { getByTestId } = render(<IndividualToy />);
    const oPrice = getByTestId('it-originPrice');
    const rPrice = getByTestId('it-rentalPrice');
    const rButton = getByTestId('it-reserveButton');
    const dates = getByTestId('it-next_date');

    const elements = [oPrice, rPrice, rButton, dates];

    elements.forEach((curElem) => {
      expect(curElem).toBeInTheDocument();
    });
  });
});
