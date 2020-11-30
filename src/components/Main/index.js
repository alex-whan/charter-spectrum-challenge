import React, { useState, useEffect } from 'react';
import Table from '../Table';
import Dropdown from '../Dropdown';
import { STATES } from './constants/states';
import { GENRES } from './constants/genres';

const Main = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [activeState, setActiveState] = useState('');
  const [activeGenre, setActiveGenre] = useState('');

  console.log('RESTAURANTS CURRENTLY', restaurants);

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
  };

  const handleSelect = e => {
    const targetValue = e.target.value;
    const category = e.target.name.toLowerCase();
    if (category === 'state') {
      setActiveState(targetValue);
      // filterState(targetValue);
    } else if (category === 'genre') {
      setActiveGenre(targetValue);
      // filterGenre(targetValue);
    }
  };

  const filterState = state => {
    // console.log('FILTERING BY:', state);
    const filtered = restaurants.filter(
      restaurant => restaurant.state === state
    );
    console.log('FILTERED DATA', filtered);
    setRestaurants(filtered);
  };

  const filterGenre = genre => {
    const filtered = restaurants.filter(
      restaurant => restaurant.genre === genre
    );
    setRestaurants(filtered);
  };

  useEffect(() => {
    getRestaurants();
  }, [activeGenre, activeState]);

  useEffect(() => {
    console.log('active:', activeState, activeGenre);
  }, [activeState, activeGenre]);

  return (
    <>
      <h1>Main component!</h1>
      <Dropdown name={'State'} opts={STATES} handler={handleSelect} />
      <Dropdown name={'Genre'} opts={GENRES} handler={handleSelect} />
      <Table props={restaurants} />
    </>
  );
};

export default Main;
