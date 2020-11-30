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

  console.log('ACTIVE STATE:', activeState);
  console.log('ACTIVE GENRE:', activeGenre);
  console.log('ACTIVE QUERY:', activeQuery);

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

  const handleSubmit = e => {
    const { value } = e.target;
    e.persist();
    const normalizedValue = value.toLowerCase();
    search(normalizedValue);
    // setActiveQuery(normalizedValue);
  };

  const search = value => {
    let filtered = restaurants.filter(
      restaurant =>
        restaurant.genre.toLowerCase().includes(activeQuery) ||
        restaurant.name.toLowerCase().includes(activeQuery) ||
        restaurant.city.toLowerCase().includes(activeQuery)
    );

    if (activeState) {
      filtered = filtered.filter(
        restaurant => restaurant.state === activeState
      );
    }

    if (activeGenre) {
      filtered = filtered.filter(restaurant =>
        restaurant.genre.toLowerCase().includes(activeGenre.toLowerCase())
      );
    }

    setDisplayRestaurants(filtered);
  };

  // const megaFilter = (activeState, activeGenre) => {
  //   const filtered = restaurants
  //     .filter(restaurant =>
  //       restaurant.genre.toLowerCase().includes(activeGenre)
  //     )
  //     .filter(restaurant => restaurant.state === activeState);
  //   console.log('FILTERED RESTAURANTS', filtered);
  //   setDisplayRestaurants(filtered);
  // };

  // ATTEMPTED RE-DO
  const megaFilter = (activeState, activeGenre, activeQuery) => {
    const states = restaurants.filter(
      restaurant => restaurant.state === activeState
    );

    const genres = states.filter(restaurant =>
      restaurant.genre.toLowerCase().includes(activeGenre)
    );

    console.log('GENRES??', genres[0]);

    setDisplayRestaurants(genres);

    // if (!activeQuery) {
    //   const searchFilter = filtered.filter(
    //     restaurant =>
    //       restaurant.genre.toLowerCase().includes(activeQuery) ||
    //       restaurant.name.toLowerCase().includes(activeQuery) ||
    //       restaurant.city.toLowerCase().includes(activeQuery)
    //   );
    //   setDisplayRestaurants(searchFilter);
    // } else {
    //   setDisplayRestaurants(filtered);
    // }
  };

  /// ORIGINAL

  // const megaFilter = (activeState, activeGenre, activeQuery) => {
  //   // console.log('active query in FILTER', activeQuery);

  //   const filtered = restaurants
  //     .filter(restaurant => restaurant.state === activeState)
  //     .filter(restaurant =>
  //       restaurant.genre.toLowerCase().includes(activeGenre)
  //     );

  //   if (!activeQuery) {
  //     const searchFilter = filtered.filter(
  //       restaurant =>
  //         restaurant.genre.toLowerCase().includes(activeQuery) ||
  //         restaurant.name.toLowerCase().includes(activeQuery) ||
  //         restaurant.city.toLowerCase().includes(activeQuery)
  //     );
  //     setDisplayRestaurants(searchFilter);
  //   } else {
  //     setDisplayRestaurants(filtered);
  //   }
  // };

  //   // .filter(restaurant => restaurant.name.includes(activeQuery))
  //   // .filter(restaurant => restaurant.genre.includes(activeQuery))
  //   // .filter(restaurant => restaurant.city.includes(activeQuery));

  //   // const filtered = [];

  //   // const filtered = [];

  //   // preFilter.map(restaurant => {
  //   //   if (
  //   //     restaurant.genre.toLowerCase().includes(activeQuery) ||
  //   //     restaurant.name.toLowerCase().includes(activeQuery) ||
  //   //     restaurant.city.toLowerCase().includes(activeQuery)
  //   //   ) {
  //   //     filtered.push(restaurant);
  //   //   }
  //   // });

  //   // setDisplayRestaurants(filtered);
  // };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    megaFilter(activeState, activeGenre, activeQuery);

    // if (!activeGenre && !activeState && !activeQuery) {
    //   getRestaurants();
    // }
  }, [activeState, activeGenre, activeQuery]);

  return (
    <>
      <Search handleSubmit={handleSubmit} />
      <Dropdown name={'State'} opts={STATES} handler={handleSelect} />
      <Dropdown name={'Genre'} opts={GENRES} handler={handleSelect} />
      <Table props={displayRestaurants} />
      <h2>{isLoading ? 'LOADING....' : ''}</h2>
    </>
  );
};

export default Main;
