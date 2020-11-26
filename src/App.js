import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const getRestaurants = async () => {
  const results = await fetch(
    'https://code-challenge.spectrumtoolbox.com/api/restaurants',
    {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt',
      },
    }
  );
  console.log('RESULTS', results);
};

function App() {
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
}

export default App;
