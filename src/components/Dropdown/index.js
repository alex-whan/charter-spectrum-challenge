import React, { useState, useRef, useEffect } from 'react';
import { STATES } from './constants/states';
import './Dropdown.css';

const Dropdown = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    const pageClickEvent = e => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive]);

  return (
    <div className="menu-container">
      <button onClick={onClick} lassName="menu-trigger">
        Filter by State
      </button>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? 'active' : 'inactive'}`}
      >
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
