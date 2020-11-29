import React, { useState, useEffect } from 'react';
import Table from '../Table';
import STATES from '../Dropdown/constants/states';

const Main = () => {
  const [restaurants, setRestaurants] = useState([]);

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

  const filterState = state => {
    const filtered = restaurants.filter(
      restaurant => restaurant.state === state
    );
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
    // console.log('RESTAURANTS??', restaurants);
  }, []);

  return (
    <>
      <h1>Main component!</h1>
      <Table props={restaurants} />
    </>
  );
};

export default Main;
