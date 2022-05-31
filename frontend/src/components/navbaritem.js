import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBarItem({render, ...props}) {
    let activeStyle = {
        textDecoration: "undefined",
      };
      if (render) {
        return (
          <li className="nav-item">
              <NavLink 
                  className='nav-link'
                  to={props.link}
                  style={({ isActive }) =>
                    isActive ? activeStyle : undefined}
                  onClick={props.onClick}
              >{props.label}</NavLink>
          </li>
        )
      } else {
        return false;
      }
}
