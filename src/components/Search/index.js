import React, { useState } from 'react';

const Search = props => {
  const [formValues, setFormValues] = useState('');

  // console.log('VALUES', formValues);
  // e.persist();
  // console.log('EVENT TARGET?', e.target.value);
  // setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const handleChange = e => {
    props.handler(e);
    setFormValues(e.target.value);
  };

  const handleSubmit = e => {
    console.log('You submitted:', formValues);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search here!"
        value={formValues}
        name="search"
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
