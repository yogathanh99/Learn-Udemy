import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Toolbar.css'

const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <Logo />
      <NavigationItems />
    </header>
  )
}

export default Toolbar
