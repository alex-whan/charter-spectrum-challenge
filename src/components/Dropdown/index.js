import React, { useState, useRef } from 'react';
import { STATES } from './constants/states';

const Dropdown = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div>
      <button onClick={onClick}>Filter by State</button>
      <nav>
        <ul>
          {STATES.map(state => {
            return <li key={state.id}>{state.code}</li>;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Dropdown;
