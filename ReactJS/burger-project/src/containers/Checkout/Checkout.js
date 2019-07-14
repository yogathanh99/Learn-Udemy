import React, { Component } from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

export default class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      bacon: 0,
      meat: 3
    }
  }
  render() {
    const {
      state: { ingredients }
    } = this
    return (
      <div>
        <CheckoutSummary ingredients={ingredients} />
      </div>
    )
  }
}
