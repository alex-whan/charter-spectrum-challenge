import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

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
    });
  // console.log('RESULTS', response.json());
};

const App = () => {
  useEffect(() => {
    getRestaurants();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
