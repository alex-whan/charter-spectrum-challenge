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
    let normalizedQuery = query.toLowerCase();
    console.log('QUERYY???', normalizedQuery);
    const filtered = restaurants.filter(restaurant => {
      restaurant.name.toLowerCase().includes(normalizedQuery);
      // ||
      //   restaurant.genre.toLowerCase().includes(normalizedQuery) ||
      //   restaurant.city.toLowerCase().includes(normalizedQuery);
    });
    setDisplayRestaurants(filtered);
  };

  // const handleSubmit = e => {
  //   console.log('SUBMITTED VALUE??', e.search);
  //   event.preventDefault();
  //   searchFilter(e.search);
  // };

  const handleInputChange = e => {
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

  // useEffect(() => {
  //   filterState(activeState);
  // }, [activeState]);

  // useEffect(() => {
  //   filterGenre(activeGenre);
  // }, [activeGenre]);

  // need to have a handleSubmit that gets passed into the Search component to go with the hook

  return (
    <>
      <h1>Main component!</h1>
      <Search handleInputChange={handleInputChange} />
      <Dropdown name={'State'} opts={STATES} handler={handleSelect} />
      <Dropdown name={'Genre'} opts={GENRES} handler={handleSelect} />
      <Table props={displayRestaurants} />
    </>
  );
};

export default Main;
