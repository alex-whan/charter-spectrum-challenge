import React, { useState } from 'react';

const Search = props => {
  const [formValues, setFormValues] = useState('');

  // console.log('VALUES', formValues);
  // e.persist();
  // console.log('EVENT TARGET?', e.target.value);
  // setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const handleChange = e => {
    setFormValues(e.target.value);
  };

  const handleSubmit = e => {
    e.persist();
    console.log('You submitted:', formValues);
    props.handleSubmit(formValues);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search"
        type="text"
        placeholder="Search restaurants by name, city, or genre!"
        value={formValues}
        name="search"
        onChange={handleChange}
      />
      <input type="submit" value="Search!" />
    </form>
  );
};

export default Search;
