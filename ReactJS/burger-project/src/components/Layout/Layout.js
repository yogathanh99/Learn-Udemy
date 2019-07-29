import React from 'react'
import { connect } from 'react-redux'
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
      props: { children, isAuthenticated },
      sideDrawerCloseHandler,
      sideDrawerToggleHandler
    } = this
    return (
      <Aux>
        <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={isAuthenticated} />
        <SideDrawer
          opened={showSideDrawer}
          closed={sideDrawerCloseHandler}
          isAuth={isAuthenticated}
        />
        <main className={classes.Content}>{children}</main>
      </Aux>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout)
