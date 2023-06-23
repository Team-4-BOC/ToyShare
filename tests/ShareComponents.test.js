import { render } from '@testing-library/react';
import StarCreator from '../client/src/components/SharedComponents/StarCreator';

import '@testing-library/jest-dom';

describe('IndividualToy Given Temp Data', () => { // Lots more to do
  test('renders toy name and rating', () => {
    const { getAllByTestId } = render(StarCreator(3));
    const unfilled = getAllByTestId('star-unfilled');
    const filled = getAllByTestId('star-filled');
    expect(unfilled.length).toBe(2);
    expect(filled.length).toBe(3);
  });
});
