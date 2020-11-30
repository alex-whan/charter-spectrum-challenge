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

  console.log('QUERY STATE?', activeQuery);
  // console.log('CURRENT RESTAURANTS:', displayRestaurants);

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

  const searchFilter = (query, arr) => {
    // const normalizedQuery = query.toLowerCase();
    const filtered = restaurants.filter(restaurant => {
      if (
        restaurant.genre.toLowerCase().includes(query) ||
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.city.toLowerCase().includes(query)
      ) {
        return restaurant;
      }
    });

    setDisplayRestaurants(filtered);
  };

  const handleFormChange = e => {
    const { value } = e.target;
    e.persist();
    const normalizedValue = value.toLowerCase();
    setActiveQuery(normalizedValue);
    // searchFilter(activeQuery);
  };

  const megaFilter = (activeState, activeGenre, activeQuery) => {
    const filtered = restaurants
      .filter(restaurant => restaurant.state === activeState)
      .filter(restaurant =>
        restaurant.genre.toLowerCase().includes(activeGenre)
      );
    // .filter(
    //   restaurant =>
    //     restaurant.genre.toLowerCase().includes(activeQuery) ||
    //     restaurant.name.toLowerCase().includes(activeQuery) ||
    //     restaurant.city.toLowerCase().includes(activeQuery)
    // );
    // setDisplayRestaurants(filtered);
    searchFilter(activeQuery, filtered);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    megaFilter(activeState, activeGenre, activeQuery);
  }, [activeState, activeGenre, activeQuery]);

  return (
    <>
      <Search handler={handleFormChange} />
      <Dropdown name={'State'} opts={STATES} handler={handleSelect} />
      <Dropdown name={'Genre'} opts={GENRES} handler={handleSelect} />
      <Table props={displayRestaurants} />
      <h2>{isLoading ? 'LOADING....' : ''}</h2>
    </>
  );
};

export default Main;
