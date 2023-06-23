import React from 'react';

const StarCreator = (rating) => { // Example implement in react {StarCreator(5)}
  const starElements = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starElements.push(<div data-testid='star-filled' className='star-icon-filled inline-block' key={i / 2}></div>);
    } else {
      starElements.push(<div data-testid='star-unfilled' className='star-icon-unfilled inline-block' key={i / 2}></div>);
    }
  }

  return <div data-testid='stars'>{starElements}</div>;
};

export default StarCreator;
