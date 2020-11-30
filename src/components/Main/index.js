import React, { useState, useEffect } from 'react';
import Table from '../Table';
import Dropdown from '../Dropdown';
import { STATES } from './constants/states';
import { GENRES } from './constants/genres';

const Main = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [activeState, setActiveState] = useState('');
  const [activeGenre, setActiveGenre] = useState('');

  // console.log('ACTIVE:', activeState, activeGenre);
  // console.log('RESTAURANTS CURRENTLY', restaurants);
  console.log('ACTIVE STATE?', activeState);

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
    } else if (category === 'genre') {
      // console.log('TARGET', targetValue);
      // let filtered = restaurants.filter(
      //   restaurant => restaurant.genre.indexOf(targetValue) !== -1
      // );
      // // setActiveGenre(targetValue);
      // console.log('FILTER RESULTS:', filtered);
      // setRestaurants(filtered);
    }
  };

  const filterState = state => {
    const filtered = restaurants.filter(
      restaurant => restaurant.state === state
    );
    console.log('FILTERED DATA', filtered);
    setRestaurants(filtered);
  };

  // const filterGenre = genre => {
  //   const filtered = restaurants.filter(restaurant =>
  //     restaurant.genre.includes(genre)
  //   );
  //   setRestaurants(filtered);
  // };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    filterState(activeState);
  }, [activeState]);

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
