import React, { useRef } from 'react';
import { STATES } from './constants/states';

const Dropdown = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div>
      <button onClick={onClick}>Filter by State</button>
      <nav>
        <ul></ul>
      </nav>
    </div>
  );
};

export default Dropdown;
