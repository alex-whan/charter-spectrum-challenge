import React from 'react';
import useForm from '../../hooks/formHook';

const Search = props => {
  // const { handleSubmit, handleInputChange } = useForm(props.handleSubmit);

  // const handleInputChange = e => {
  //   const { value } = e.target;
  //   e.persist();
  //   console.log('VALUE IN SEARCH FORM:', value);
  // };

  // onSubmit={handleSubmit}

  return (
    <form>
      <label>Search Here</label>
      <input type="text" name="search" onChange={props.handleInputChange} />
    </form>
  );
};

export default Search;
