import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const NavigationItems = props => {
  const { isAuthenticated } = props
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
      {!isAuthenticated ? (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Log out</NavigationItem>
      )}
    </ul>
  )
}

export default NavigationItems
