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
  };

  const filterState = restaurant => {
    if (activeState) {
      return restaurant.state === activeState;
    } else {
      return restaurant;
    }
  };

  const filterGenre = restaurant => {
    if (activeGenre) {
      return restaurant.genre.toLowerCase().includes(activeGenre);
    } else {
      return restaurant;
    }
  };

  const filterSearch = restaurant => {
    if (activeQuery) {
      let normalizedName = restaurant.name.toLowerCase();
      let normalizedCity = restaurant.city.toLowerCase();
      let normalizedGenre = restaurant.genre.toLowerCase();
      if (
        normalizedName.includes(activeQuery) ||
        normalizedCity.includes(activeQuery) ||
        normalizedGenre.includes(activeQuery)
      ) {
        return restaurant;
      }
    } else {
      return restaurant;
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    let result = restaurants.filter(filterState);
    result = result.filter(filterGenre);
    result = result.filter(filterSearch);
    setDisplayRestaurants(result);
  }, [activeState, activeGenre, activeQuery]);

  return (
    <>
      <Search formHandler={formHandler} clearSearch={clearSearch} />
      <Dropdown name={'State'} opts={STATES} selectHandler={handleSelect} />
      <Dropdown name={'Genre'} opts={GENRES} selectHandler={handleSelect} />
      <Table props={displayRestaurants} />
      <h2>{isLoading ? 'LOADING....' : ''}</h2>
    </>
  );
};

export default Main;
