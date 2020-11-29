import React, { useState, useEffect } from 'react';
import List from '../List';

const Main = () => {
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = () => {
    const response = fetch(
      'https://code-challenge.spectrumtoolbox.com/api/restaurants',
      {
        headers: {
          Authorization: 'Api-Key q3MNxtfep8Gt',
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log('DATA', data);
        setRestaurants(data);
      });
  };

  useEffect(() => {
    getRestaurants();
    console.log('RESTAURANTS??', restaurants);
  }, []);

  return (
    <>
      <h1>Main component!</h1>
      <List />
    </>
  );
};

export default Main;
