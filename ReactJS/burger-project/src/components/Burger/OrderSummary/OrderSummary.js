import React from 'react'

import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const OrderSummary = props => {
  const { ingredients, price, purchaseCancelled, purchaseContinued } = props
  const ingredientSummary = Object.keys(ingredients).map(ingreKey => (
    <li key={ingreKey}>
      <span style={{ textTransform: 'capitalize' }}>{ingreKey}</span>: {props.ingredients[ingreKey]}
    </li>
  ))
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <strong>Total price: {price.toFixed(2)}</strong>
      <p>Continue to Checkout ?</p>
      <Button btnType="Danger" clicked={purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  )
}

export default OrderSummary
