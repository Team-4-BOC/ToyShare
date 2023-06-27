import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import TopBar from './TopBar.jsx';
import ToyCard from './ToyCard.jsx';

function Home ({ setToyId, setToyUserId, setPage, searchTerm, userCoords, setUserCoords, userId }) {
  const [toys, setToys] = useState([]);
  const [renderedToys, setRenderedToys] = useState([]);

  const fetchUserCoords = () => {
    axios.get('/userCoords', { params: { id: userId }})
      .then((apiData) => {
        console.log(apiData.data);
      })
      .catch((err) => {
        console.log('ERROR fetching coords ', err);
      });
  };

  const fetchToys = () => {
    const count = 10;
    const page = Math.floor(Math.random() * 2) + 1;
    axios
      .get("/toys", { params: { page, count } })
      .then((response) => {
        setRenderedToys(response.data);
        setToys(response.data);
      })
      .catch((err) => {
        console.log("ERROR fetching toys ", err);
      });
  };

  useEffect(() => { if (userId !== undefined) { fetchUserCoords(); } }, [userId]);

  useEffect(fetchToys, []);

  useEffect(() => {
    if (toys.length !== 0) {
      if (searchTerm.length > 0) {
        let tempArr = [];
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
  }, [searchTerm]);

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
