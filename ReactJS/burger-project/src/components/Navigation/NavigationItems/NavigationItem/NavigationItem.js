import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.css'

const NavigationItem = props => {
  const { link, children } = props
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={link} activeClassName={classes.active} exact>
        {children}
      </NavLink>
    </li>
  )
}

export default NavigationItem
