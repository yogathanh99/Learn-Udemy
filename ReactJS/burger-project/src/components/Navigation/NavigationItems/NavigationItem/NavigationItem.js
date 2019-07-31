import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.css'

const NavigationItem = props => {
  const { link, children, clicked } = props
  return (
    <li className={classes.NavigationItem}>
      <NavLink onClick={clicked} to={link} activeClassName={classes.active} exact>
        {children}
      </NavLink>
    </li>
  )
}

export default NavigationItem
