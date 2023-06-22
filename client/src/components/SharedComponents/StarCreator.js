import React from 'react';

const StarCreator = (rating) => { // Example implement in react {StarCreator(5)}
  const starElements = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starElements.push(<div className='star-icon-filled inline-block' key={i / 2}></div>);
    } else {
      starElements.push(<div className='star-icon-unfilled inline-block' key={i / 2}></div>);
    }
  }

  return <div>{starElements}</div>;
};

export default StarCreator;
