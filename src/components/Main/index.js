import React, { useState, useEffect } from 'react';
import Table from '../Table';
import Dropdown from '../Dropdown';
import Search from '../Search';
import { STATES } from './constants/states';
import { GENRES } from './constants/genres';

const Main = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [displayRestaurants, setDisplayRestaurants] = useState([]);
  const [activeState, setActiveState] = useState('');
  const [activeGenre, setActiveGenre] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // console.log('ACTIVE STATE:', activeState);
  // console.log('ACTIVE GENRE:', activeGenre);
  // console.log('ACTIVE QUERY:', activeQuery);
  // console.log('CURRENT DISPLAY:', displayRestaurants);

  const getRestaurants = async () => {
    setIsLoading(true);
    const response = await fetch(
      'https://code-challenge.spectrumtoolbox.com/api/restaurants',
      {
        headers: {
          Authorization: 'Api-Key q3MNxtfep8Gt',
        },
      }
    );

    const data = await response.json();
    setIsLoading(false);
    const alphabetizedData = data.sort((a, b) => (a.name > b.name ? 1 : -1));
    setRestaurants(alphabetizedData);
    setDisplayRestaurants(alphabetizedData);
  };

  const handleSelect = e => {
    const targetValue = e.target.value;
    const category = e.target.name.toLowerCase();
    if (category === 'state') {
      setActiveState(targetValue);
    } else if (category === 'genre') {
      setActiveGenre(targetValue);
    }
  };

  const formHandler = value => {
    let normalizedValue = value.toLowerCase();
    setActiveQuery(normalizedValue);
  };

  const clearSearch = () => {
    setActiveState('');
    setActiveGenre('');
    setActiveQuery('');
    filterState(activeState);
    filterGenre(activeGenre);
    filterSearch(activeQuery);
  };

  // const filterState = state => {
  //   if (activeGenre) {
  //     const filtered = restaurants.filter(
  //       restaurant =>
  //         restaurant.state === state &&
  //         restaurant.genre.toLowerCase().includes(activeGenre)
  //     );
  //     setDisplayRestaurants(filtered);
  //   } else {
  //     const filtered = restaurants.filter(
  //       restaurant => restaurant.state === state
  //     );
  //     setDisplayRestaurants(filtered);
  //   }
  // };

  // const filterGenre = genre => {
  //   if (activeState) {
  //     const filtered = restaurants.filter(
  //       restaurant =>
  //         restaurant.genre.toLowerCase().includes(genre) &&
  //         restaurant.state === activeState
  //     );
  //     setDisplayRestaurants(filtered);
  //   } else {
  //     const filtered = restaurants.filter(restaurant =>
  //       restaurant.genre.toLowerCase().includes(genre)
  //     );
  //     setDisplayRestaurants(filtered);
  //   }
  // };

  // const filterSearch = query => {
  //   const filtered = restaurants.filter(place => {
  //     let normalizedName = place.name.toLowerCase();
  //     let normalizedCity = place.city.toLowerCase();
  //     let normalizedGenre = place.genre.toLowerCase();

  //     if (
  //       normalizedName.includes(query) ||
  //       normalizedCity.includes(query) ||
  //       normalizedGenre.includes(query)
  //     ) {
  //       return place;
  //     }
  //   });
  //   console.log('RESULTS OF FILTER:', filtered);
  //   setDisplayRestaurants(filtered);
  // };

  const filterState = state => {
    const filtered = restaurants.filter(
      restaurant => restaurant.state === state
    );
    // console.log('FILTER STATE', filtered);
    // setDisplayRestaurants(filtered);
    return filtered;
  };

  const filterGenre = (arr, genre) => {
    const filtered = arr.filter(restaurant =>
      restaurant.genre.toLowerCase().includes(genre)
    );
    // console.log('FILTER GENRE', filtered);
    // setDisplayRestaurants(filtered);
    return filtered;
  };

  const filterSearch = (arr, query) => {
    const filtered = displayRestaurants.filter(place => {
      let normalizedName = place.name.toLowerCase();
      let normalizedCity = place.city.toLowerCase();
      let normalizedGenre = place.genre.toLowerCase();

      if (
        normalizedName.includes(query) ||
        normalizedCity.includes(query) ||
        normalizedGenre.includes(query)
      ) {
        return place;
      }
    });
    // console.log('FILTER SEARCH', filtered);
    return filtered;
    // setDisplayRestaurants(filtered);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    let results = filterState(activeState);
    console.log('RESULTS??', results);
    // filterState(activeState);
    // filterGenre(activeGenre);
    // filterSearch(activeQuery);
    setDisplayRestaurants(results);
  }, [activeState, activeGenre, activeQuery]);

  return (
    <>
      <Search formHandler={formHandler} clearSearch={clearSearch} />
      <Dropdown name={'State'} opts={STATES} handler={handleSelect} />
      <Dropdown name={'Genre'} opts={GENRES} handler={handleSelect} />
      <Table props={displayRestaurants} />
      <h2>{isLoading ? 'LOADING....' : ''}</h2>
    </>
  );
};

export default Main;
