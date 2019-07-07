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
    const {
      state: { ingredients, totalPrices, purchase, purchasing },
      addIngredientHandler,
      removeIngredientHandler,
      purchaseHandler,
      purchaseCancelHandler,
      purchaseContinueHandler
    } = this

    const disabledInfor = {
      ...ingredients
    }

    for (let key in disabledInfor) disabledInfor[key] = disabledInfor[key] <= 0
    return (
      <Aux>
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
          <OrderSummary
            price={totalPrices}
            ingredients={ingredients}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemoved={removeIngredientHandler}
          disabled={disabledInfor}
          purchase={purchase}
          price={totalPrices}
          ordered={purchaseHandler}
        />
      </Aux>
    )
  }
}
