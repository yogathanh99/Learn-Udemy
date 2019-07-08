import React from 'react'
import Aux from '../../hoc/Aux'

import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import classes from './Layout.css'

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    const {
      state: { showSideDrawer },
      props: { children },
      sideDrawerCloseHandler,
      sideDrawerToggleHandler
    } = this
    return (
      <Aux>
        <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
        <SideDrawer opened={showSideDrawer} closed={sideDrawerCloseHandler} />
        <main className={classes.Content}>{children}</main>
      </Aux>
    )
  }
}

export default Layout
