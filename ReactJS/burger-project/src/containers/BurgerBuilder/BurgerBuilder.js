import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as burgerBuilderActions from '../../store/actions'
import axios from '../../axios-orders' //Axios instance
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../..//components/UI/Spinner/Spinner'

class BurgerBuilder extends Component {
  state = {
    totalPrices: 0,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    this.props.onFetchIngredients()
  }

  updatePurchaseHandler = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingreKey => ingredients[ingreKey])
      .reduce((sum, el) => sum + el, 0)

    return sum > 0
  }

  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type]
  //   const updateCount = oldCount + 1
  //   const updateIngredients = {
  //     ...this.state.ingredients
  //   }

  //   updateIngredients[type] = updateCount
  //   const oldPrice = this.state.totalPrices
  //   const newPrice = INGREDIENTS_PRICES[type]
  //   const prices = oldPrice + newPrice

  //   this.setState({
  //     ingredients: updateIngredients,
  //     totalPrices: prices
  //   })
  //   this.updatePurchaseHandler(updateIngredients)
  // }

  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type]
  //   if (oldCount <= 0) return

  //   const updateCount = oldCount - 1
  //   const updateIngredients = {
  //     ...this.state.ingredients
  //   }

  //   updateIngredients[type] = updateCount
  //   const oldPrice = this.state.totalPrices
  //   const newPrice = INGREDIENTS_PRICES[type]
  //   const prices = oldPrice - newPrice

  //   this.setState({
  //     ingredients: updateIngredients,
  //     totalPrices: prices
  //   })
  //   this.updatePurchaseHandler(updateIngredients)
  // }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    // const queryParams = []
    // for (let i in this.state.ingredients)
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // queryParams.push(`price=${this.state.totalPrices}`)
    // const queryString = queryParams.join('&')
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: `?${queryString}`
    // }
    this.props.history.push('/checkout')
  }

  render() {
    const {
      state: { purchasing, loading },
      props: { ings, price, error, onIncrementValue, onDecrementValue },
      purchaseHandler,
      purchaseCancelHandler,
      updatePurchaseHandler,
      purchaseContinueHandler
    } = this

    const disabledInfor = {
      ...ings
    }

    for (let key in disabledInfor) disabledInfor[key] = disabledInfor[key] <= 0
    let orderSummary = null
    let burger = error ? <p style={{ textAlign: 'center' }}>Something wrong...</p> : <Spinner />

    if (ings) {
      burger = (
        <Aux>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={onIncrementValue}
            ingredientRemoved={onDecrementValue}
            disabled={disabledInfor}
            purchase={updatePurchaseHandler(ings)}
            price={price}
            ordered={purchaseHandler}
          />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          price={price}
          ingredients={ings}
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

const mapStateToProps = state => ({
  ings: state.ingredients,
  price: state.totalPrice,
  error: state.error
})

const mapDispatchToProps = dispatch => ({
  onIncrementValue: ingredientName => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
  onDecrementValue: ingredientName =>
    dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
  onFetchIngredients: () => dispatch(burgerBuilderActions.fetchIngredients())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
