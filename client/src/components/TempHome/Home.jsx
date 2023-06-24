import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import TopBar from './TopBar.jsx';
import ToyCard from './ToyCard.jsx';

function Home ({ setToyId, setToyUserId, setPage }) {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    axios.get('/toys')
      .then((response) => {
        // only render 10 toys
        setToys(response.data.slice(0, -25));
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
