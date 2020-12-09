import React, { useState } from 'react';

const Search = ({ formHandler, clearSearch }) => {
  const [formValue, setFormValues] = useState('');

  const handleChange = e => {
    setFormValues(e.target.value);
  };

  const handleSubmit = e => {
    e.persist();
    formHandler(formValue);
    e.preventDefault();
    setFormValues('');
  };

  const handleClear = () => {
    clearSearch();
    setFormValues('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search"
        type="text"
        value={formValue}
        placeholder="Search restaurants by name, city, or genre!"
        onChange={handleClear}
      />
      <button onClick={handleClear}>Clear</button>
    </form>
  );
};

export default Search;
