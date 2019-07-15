import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContactData/ContractData'

export default class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price = 0
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1]
      } else ingredients[param[0]] = +param[1] //like parseInt(param[1])
    }

    this.setState({ ingredients: ingredients, totalPrice: price })
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    const {
      state: { ingredients, totalPrice },
      checkoutCancelledHandler,
      checkoutContinuedHandler
    } = this
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={props => (
            <ContactData {...props} ingredients={ingredients} totalPrice={totalPrice} />
          )}
        />
      </div>
    )
  }
}
