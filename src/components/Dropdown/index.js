import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = props => {
  console.log('PROP STATES??', { props });
  const opts = props.opts;
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
          {opts.map(item => {
            return <li key={item.id}>{item.code}</li>;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Dropdown;
