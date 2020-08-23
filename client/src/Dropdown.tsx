import React from 'react';
import { Link } from "react-router-dom";

const Dropdown = (props: any): JSX.Element => (
  <div className="dropdown-menu" id={props.id}>
    {Object.entries(props.data)
    .map(([text, route], index) => (
      text === 'Logout' ? (
        <li key={`${props.id}-${index}`} 
        className="dropdown-item" 
        onClick={ props.logOut }
        >
          <a>{text}</a>
        </li>
      ) : (
        <li key={`${props.id}-${index}`} 
        className="dropdown-item" 
        >
          <Link to={route}>{text}</Link>
        </li>
      )
    ) 
    )}
  </div>
)

export default Dropdown;