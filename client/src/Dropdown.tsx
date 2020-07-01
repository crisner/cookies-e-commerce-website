import React from 'react';
import { Link } from "react-router-dom";

const Dropdown = (props): JSX.Element => (
  <div className="dropdown-menu" id={props.id}>
    {Object.entries(props.data)
    .map(([text, route], index) => (
      <li key={`${props.id}-${index}`} className="dropdown-item">
        <Link to={route}>{text}</Link>
      </li>)
    )}
  </div>
)

export default Dropdown;