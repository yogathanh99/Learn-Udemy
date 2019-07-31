import React, { Component, lazy } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import * as actions from './store/actions'

const Checkout = lazy(() => import('./containers/Checkout/Checkout'))
const Orders = lazy(() => import('./containers/Orders/Orders'))
const Auth = lazy(() => import('./containers/Auth/Auth'))

class App extends Component {
  componentDidMount() {
    this.props.onCheckAutoSignup()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncComponent(Auth)} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncComponent(Checkout)} />
          <Route path="/orders" component={asyncComponent(Orders)} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncComponent(Auth)} />
          <Route exact path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onCheckAutoSignup: () => dispatch(actions.checkAuthState())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
