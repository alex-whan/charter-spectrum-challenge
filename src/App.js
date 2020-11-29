import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

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
      // May need to refactor as async/await
    });
};

const App = () => {
  useEffect(() => {
    getRestaurants();
  });

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
