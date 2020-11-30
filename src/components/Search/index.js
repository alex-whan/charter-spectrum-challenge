import React from 'react';
import useForm from '../../hooks/formHook';

const Search = props => {
  const { handleSubmit, handleInputChange } = useForm(props.handleSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <label>Search Here</label>
      <input type="text" name="name" />
    </form>
  );
};

export default Search;
