import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToyCard from './ToyCard.jsx';

function Home ({ setToyId, setToyUserId, setPage, searchTerm, setToys, toys }) {
  const [renderedToys, setRenderedToys] = useState([]);

  useEffect(() => {
    getToys();
  }, []);

  useEffect(() => {
    handleSearchTermChange();
  }, [searchTerm]);

  const getToys = () => {
    const count = 10;
    const page = Math.floor(Math.random() * 2) + 1;
    axios
      .get('/toys', { params: { page, count } })
      .then((response) => {
        setRenderedToys(response.data);
        setToys(response.data);
      })
      .catch((err) => {
        console.log('ERROR fetching toys ', err);
      });
  }

  const handleSearchTermChange = () => {
    if (toys.length !== 0) {
      if (searchTerm.length > 0) {
        const tempArr = [];
        for (let i = 0; i < toys.length; i++) {
          if (
            toys[i].toy_name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            tempArr.push(toys[i]);
          }
        }
        setRenderedToys(tempArr);
      } else {
        setRenderedToys(toys);
      }
    }
  }

  const handleToyClick = (toyId, userId) => {
    setToyId(toyId);
    setToyUserId(userId);
    setPage(1);
  };

  return (
    <div>
      <ul>
        {renderedToys.map((toy) => (
          <div key={toy.id}>
            <ToyCard toy={toy} handleToyClick={handleToyClick} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Home;
