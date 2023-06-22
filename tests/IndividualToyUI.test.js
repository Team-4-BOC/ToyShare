import React from 'react';
import { render, screen } from '@testing-library/react';
import IndividualToy from '../client/src/components/IndividualToy/IndividualToy.jsx';

import '@testing-library/jest-dom';

import tempData from '../client/src/components/IndividualToy/tempData.js';

describe('IndividualToy', () => {
  test('renders toy name and rating when given tempData', () => {
    const { getByTestId } = render(<IndividualToy tempData={tempData}/>);
    const nameElement = getByTestId('it-toy-name');
    const ratingElement = getByTestId('stars');
    expect(nameElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
  });
});
