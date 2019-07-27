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
    purchasing: false
  }

  componentDidMount() {
    this.props.onFetchIngredients()
  }

  updatePurchaseHandler(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit()
    this.props.history.push('/checkout')
  }

  render() {
    const {
      state: { purchasing },
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
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error
})

const mapDispatchToProps = dispatch => ({
  onIncrementValue: ingredientName => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
  onDecrementValue: ingredientName =>
    dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
  onFetchIngredients: () => dispatch(burgerBuilderActions.fetchIngredients()),
  onPurchaseInit: () => dispatch(burgerBuilderActions.purchaseInit())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
