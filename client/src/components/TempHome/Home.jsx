import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToyCard from './ToyCard.jsx';

function Home ({ setToyId, setToyUserId, setPage, searchTerm, sort, filter, userCoords, toysIDCoordsPhoto }) {
  const [toys, setToys] = useState([]);
  const [renderedToys, setRenderedToys] = useState([]);

  useEffect(() => {
    fetchToys();
  }, []);

  useEffect(() => {
    handleSearchTermChange();
  }, [searchTerm]);

  useEffect(() => {
    handleSortChange();
  }, [sort]);

  useEffect(() => {
    handleFilterChange();
  }, [filter]);

  const fetchToys = () => {
    const count = 100;
    const page = 1;
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

  const handleSortChange = () => {
    if (toys.length !== 0) {
      if (sort == "") {
        setRenderedToys(toys);
      } else if (sort == "newest") {
        setRenderedToys(toys); //need to change
      } else if (sort == "rating") {
        var sorted = JSON.parse(JSON.stringify(toys));
        console.log(sorted)
        sorted.sort((a, b) => {return b.rating - a.rating});
        console.log(sorted)
        setRenderedToys(sorted);
      } else if (sort == "distance") {
        setRenderedToys(toys); //need to change
      }
    } else {
      setRenderedToys(toys);
    }
  }

  const handleFilterChange = () => {
    if (toys.length !== 0) {
      if (filter == "") {
        setRenderedToys(toys);
      } else if (filter = "recommend") {
        var mockUserRecommendCategories = [4, 7, 11]; // based on user's saved toys, probably max of 3 categories even if they have more different categories saved
        var filtered = [];
        for (let i = 0; i < toys.length; i++) {
          if (mockUserRecommendCategories.includes(toys[i].category_id)) {
            filtered.push(toys[i]);
          }
        }
        setRenderedToys(filtered);
      }
    } else {
      setRenderedToys(toys);
    }
  }

  const handleToyClick = (toyId, userId) => {
    setToyId(toyId);
    setToyUserId(userId);
    setPage(1);
  };

  // console.log(renderedToys);

  return (
    <ul className="grid grid-cols-2">
      {renderedToys.map((toy) => (
        <ToyCard toy={toy} handleToyClick={handleToyClick} userCoords={userCoords} toysIDCoordsPhoto={toysIDCoordsPhoto} />
      ))}
    </ul>
  );
}

export default Home;
