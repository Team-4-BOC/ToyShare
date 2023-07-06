import React from 'react';
import { render, screen } from '@testing-library/react';
import AddToy from '../client/src/components/AddEditToy/AddToy.jsx';
// import App from '../client/src/App.jsx';

describe('Add Toy Component', () => {
  test('Renders the AddToy Page', () => {
    render(<AddToy />);
    screen.debug();
  });
});
