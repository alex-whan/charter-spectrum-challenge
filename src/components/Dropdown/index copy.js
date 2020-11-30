import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = props => {
  const opts = props.opts;
  const filterType = props.name;
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
      <button onClick={onClick} className="menu-trigger">
        Filter by {filterType}
      </button>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? 'active' : 'inactive'}`}
      >
        <ul>
          {opts.map(item => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Dropdown;

{
  /* <select>
        {STATES.map(state => {
          return (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          );
        })}
      </select> */
}
