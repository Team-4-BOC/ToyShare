import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import TopBar from './TopBar.jsx';
import ToyCard from './ToyCard.jsx';

function Home ({ setToyId, setToyUserId, setPage }) {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    const count = 30;
    const page = 1;
    axios.get('/toys', ({ params: { page, count } }))
      .then((response) => {
        setToys(response.data);
      })
      .catch((err) => {
        console.log('ERROR fetching toys ', err);
      });
  }, []);

  const handleToyClick = (toyId, userId) => {
    setToyId(toyId);
    setToyUserId(userId);
    setPage(1);
  };

  return (
    <div>
      <ul>
      {toys.map(toy => <div key={toys.id}><ToyCard toy={toy} handleToyClick={ handleToyClick } /></div>)}
      </ul>
    </div>
  );
};

export default Home;
