import React, { Component } from 'react'

import axios from '../../axios-orders' //Axios instance
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../..//components/UI/Spinner/Spinner'

const INGREDIENTS_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.5
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrices: 0,
    purchase: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios
      .get('https://burger-app-react-thanhvo.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data
        })
      })
      .catch(error => {
        this.setState({ error: true })
      })
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
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrices,
      customer: {
        name: 'Thanh',
        email: 'vtthanh99@gmail.com',
        deliveryMethod: 'fastest'
      }
    }

    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({
          purchasing: false,
          loading: false
        })
      })
      .catch(error => {
        this.setState({
          purchasing: false,
          loading: false
        })
      })
  }

  render() {
    const {
      state: { ingredients, totalPrices, purchase, purchasing, loading, error },
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
    let orderSummary = null
    let burger = error ? <p style={{ textAlign: 'center' }}>Something wrong...</p> : <Spinner />

    if (ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          price={totalPrices}
          ingredients={ingredients}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      )
    }

    if (loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}
export default withErrorHandler(BurgerBuilder, axios)
