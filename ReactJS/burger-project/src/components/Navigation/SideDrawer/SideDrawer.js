import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'
import classes from './SideDrawer.css'

const SideDrawer = props => {
  const { opened, closed, isAuth } = props
  let attachedClasses = [classes.SideDrawer, classes.Close]

  if (opened) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <Aux>
      <Backdrop show={opened} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuth} clicked={closed} />
        </nav>
      </div>
    </Aux>
  )
}

export default SideDrawer
