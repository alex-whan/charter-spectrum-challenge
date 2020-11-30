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
  // const [activeQuery, setActiveQuery] = useState('');

  // console.log('QUERY STATE?', activeQuery);
  console.log('CURRENT RESTAURANTS:', displayRestaurants);

  const getRestaurants = async () => {
    const response = await fetch(
      'https://code-challenge.spectrumtoolbox.com/api/restaurants',
      {
        headers: {
          Authorization: 'Api-Key q3MNxtfep8Gt',
        },
      }
    );

    const data = await response.json();
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

  const filterState = state => {
    if (activeGenre) {
      const filtered = restaurants.filter(
        restaurant =>
          restaurant.state === state &&
          restaurant.genre.toLowerCase().includes(activeGenre)
      );
      setDisplayRestaurants(filtered);
    } else {
      const filtered = restaurants.filter(
        restaurant => restaurant.state === state
      );
      setDisplayRestaurants(filtered);
    }
  };

  const filterGenre = genre => {
    if (activeState) {
      const filtered = restaurants.filter(
        restaurant =>
          restaurant.genre.toLowerCase().includes(genre) &&
          restaurant.state === activeState
      );
      setDisplayRestaurants(filtered);
    } else {
      const filtered = restaurants.filter(restaurant =>
        restaurant.genre.toLowerCase().includes(genre)
      );
      setDisplayRestaurants(filtered);
    }
  };

  const searchFilter = query => {
    const normalizedQuery = query.toLowerCase();
    const filtered = restaurants.filter(restaurant => {
      if (
        restaurant.genre.toLowerCase().includes(normalizedQuery) ||
        restaurant.name.toLowerCase().includes(normalizedQuery) ||
        restaurant.city.toLowerCase().includes(normalizedQuery)
      ) {
        return restaurant;
      }
    });

    setDisplayRestaurants(filtered);
  };

  const handleFormChange = e => {
    const { value } = e.target;
    e.persist();
    searchFilter(value);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    filterState(activeState);
    filterGenre(activeGenre);
  }, [activeState, activeGenre]);

  return (
    <>
      <h1>Main component!</h1>
      <Search handler={handleFormChange} />
      <Dropdown name={'State'} opts={STATES} handler={handleSelect} />
      <Dropdown name={'Genre'} opts={GENRES} handler={handleSelect} />
      <Table props={displayRestaurants} />
    </>
  );
};

export default Main;
