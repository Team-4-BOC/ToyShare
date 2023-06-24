import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import TopBar from './TopBar.jsx';
import ToyCard from './ToyCard.jsx';

function Home () {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    axios.get('/toys')
      .then((response) => {
        // only render 10 toys
        setToys(response.data.slice(0, -25));
      });
  }, []);

  return (
    <div>
      <ul>
      {toys.map(toy => <div key={toys.id}><ToyCard toy={toy} /></div>)}
      </ul>
    </div>
  );
};

export default Home;
