import React, { useState, useEffect } from 'react';
import List from '../List';

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

  useEffect(() => {
    getRestaurants();
    console.log('RESTAURANTS??', restaurants);
  }, []);

  return (
    <>
      <h1>Main component!</h1>
      <List props={restaurants} />
    </>
  );
};

export default Main;
