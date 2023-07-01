import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToyCard from './ToyCard.jsx';

function Home ({ setToyId, setToyUserId, setPage, searchTerm, sort, filter, userCoords, toysIDCoordsPhoto, userId }) {
  const [toys, setToys] = useState([]);
  const [renderedToys, setRenderedToys] = useState([]);

  useEffect(() => {
    fetchToys();
  }, []);

  useEffect(() => {
    handleSearchTermChange();
    // fetchUser();
    // fetchSaved();
    fetchEarliest();
  }, [searchTerm]);

  useEffect(() => {
    handleSortChange();
  }, [sort]);

  useEffect(() => {
    handleFilterChange();
  }, [filter]);

  const fetchUser = () => { //testing query
    const id = 1;
    axios
    .get('/user', { params: { id } })
    .then((response) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.log('ERROR fetching user ', err);
    });
  }

  const fetchSaved = () => { //testing query
    axios
    .get('/saved', { params: { userId } })
    .then((response) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.log('ERROR fetching user saved toys ', err);
    });
  }

  const fetchEarliest = () => {
    axios
    .get('/bookings/getEarliestInstanceOfEachToy')
    .then((response) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.log('ERROR fetching earliest instance of each toy ', err);
    });
  }









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
        axios
          .get('/bookings/getEarliestInstanceOfEachToy')
          .then((response) => {
            var sortedDates = JSON.parse(JSON.stringify(response.data));
            sortedDates.sort((a, b) => {return new Date(b.dates) - new Date(a.dates)});
            var sortedToys = [];
            for (let i = 0; i < sortedDates.length; i++) {
              for (let j = 0; j < toys.length; j++) {
                if (sortedDates[i].toy_id == toys[j].id) {
                  sortedToys.push(toys[j]);
                }
              }
            }
            console.log(sortedToys);
            setRenderedToys(sortedToys);
          })
          .catch((err) => {
            console.log('ERROR fetching earliest instance of each toy ', err);
          });
      } else if (sort == "rating") {
        var sorted = JSON.parse(JSON.stringify(toys));
        sorted.sort((a, b) => {return b.rating - a.rating});
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
        // const userId = 11;
        axios
          .get('/saved', { params: { userId } })
          .then((response) => {
            var userSavedToys = [];
            var userRecommendCategories = [];
            var filtered = [];
            for (let i = 0; i < response.data.length; i++) {
              userSavedToys.push(response.data[i].toy_id);
            }
            for (let i = 0; i < toys.length; i++) {
              if (userSavedToys.includes(toys[i].id)) {
                userRecommendCategories.push(toys[i].category_id);
              }
            }
            for (let i = 0; i < toys.length; i++) {
              if (userRecommendCategories.includes(toys[i].category_id)) {
                filtered.push(toys[i]);
              }
            }
            setRenderedToys(filtered);
          })
          .catch((err) => {
            console.log('ERROR fetching user saved toys ', err);
          });
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
