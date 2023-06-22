import React from 'react';

const StarCreator = (rating) => { // Example implement in react {StarCreator(5)}
  const starElements = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starElements.push(<div className='text-yellow-500 inline-block'>★</div>);
    } else {
      starElements.push(<div className='text-yellow-700 inline-block'>✩</div>);
    }
  }

  return <div>{starElements}</div>;
};

export default StarCreator;
