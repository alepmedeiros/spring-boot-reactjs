import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBarItem(props) {
    let activeStyle = {
        textDecoration: "undefined",
      };
  return (
    <li className="nav-item">
        <NavLink 
            className='nav-link'
            to={props.link}
            style={({ isActive }) =>
              isActive ? activeStyle : undefined}
        >{props.label}</NavLink>
    </li>
  )
}
