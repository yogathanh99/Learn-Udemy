import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const NavigationItems = props => {
  const { isAuthenticated, clicked } = props
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" clicked={clicked}>
        Burger Builder
      </NavigationItem>
      {isAuthenticated ? (
        <NavigationItem link="/orders" clicked={clicked}>
          Orders
        </NavigationItem>
      ) : null}
      {!isAuthenticated ? (
        <NavigationItem link="/auth" clicked={clicked}>
          Authenticate
        </NavigationItem>
      ) : (
        <NavigationItem link="/logout" clicked={clicked}>
          Log out
        </NavigationItem>
      )}
    </ul>
  )
}

export default NavigationItems
