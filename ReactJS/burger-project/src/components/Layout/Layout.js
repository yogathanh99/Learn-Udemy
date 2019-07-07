import React from 'react'
import Aux from '../../hoc/Aux'

import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.css'

const Layout = props => {
  return (
    <Aux>
      <Toolbar />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  )
}

export default Layout
