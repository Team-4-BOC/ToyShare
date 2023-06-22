import React from 'react';
import { render, screen } from '@testing-library/react';
import IndividualToy from '../client/src/components/IndividualToy.jsx';

import tempData from '../client/src/components/IndividualToy/tempData.js';

describe('IndividualToy', () => {
  test('renders toy name and rating when given tempData', () => {
    render(<IndividualToy tempData={tempData}/>);
    const element = screen.getByTestId('my-element');
    expect(element).toBeInTheDocument();
  });
});
