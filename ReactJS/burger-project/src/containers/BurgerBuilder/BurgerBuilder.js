import React, { Component } from 'react'

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.5
}

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrices: 0,
    purchase: false,
    purchasing: false
  }

  updatePurchaseHandler = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingreKey => ingredients[ingreKey])
      .reduce((sum, el) => sum + el, 0)

    this.setState({
      purchase: sum > 0
    })
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]
    const updateCount = oldCount + 1
    const updateIngredients = {
      ...this.state.ingredients
    }

    updateIngredients[type] = updateCount
    const oldPrice = this.state.totalPrices
    const newPrice = INGREDIENTS_PRICES[type]
    const prices = oldPrice + newPrice

    this.setState({
      ingredients: updateIngredients,
      totalPrices: prices
    })
    this.updatePurchaseHandler(updateIngredients)
  }

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) return

    const updateCount = oldCount - 1
    const updateIngredients = {
      ...this.state.ingredients
    }

    updateIngredients[type] = updateCount
    const oldPrice = this.state.totalPrices
    const newPrice = INGREDIENTS_PRICES[type]
    const prices = oldPrice - newPrice

    this.setState({
      ingredients: updateIngredients,
      totalPrices: prices
    })
    this.updatePurchaseHandler(updateIngredients)
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    alert('You are continue!')
  }

  render() {
    const disabledInfor = {
      ...this.state.ingredients
    }

    for (let key in disabledInfor) disabledInfor[key] = disabledInfor[key] <= 0
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfor}
          purchase={this.state.purchase}
          price={this.state.totalPrices}
          ordered={this.purchaseHandler}
        />
      </Aux>
    )
  }
}
