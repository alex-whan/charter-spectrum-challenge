import React, { useState } from 'react';

const Search = ({ formHandler }) => {
  const [formValue, setFormValues] = useState('');

  const handleChange = e => {
    setFormValues(e.target.value);
  };

  // const handleSubmit = e => {
  //   e.persist();
  //   console.log('You submitted:', formValues);
  //   props.handleSubmit(formValues);
  //   e.preventDefault();
  // };

  const handleSubmit = e => {
    e.persist();
    formHandler(formValue);
    e.preventDefault();
    setFormValues('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search"
        type="text"
        value={formValue}
        placeholder="Search restaurants by name, city, or genre!"
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
