import React from 'react'

import classes from './Order.css'

const Order = props => {
  const ingredientsData = []
  const { ingredients, price } = props
  for (let ingredientName in ingredients) {
    ingredientsData.push({
      name: ingredientName,
      amount: ingredients[ingredientName]
    })
  }

  const ingredientsOutput = ingredientsData.map((ingre, index) => (
    <span
      key={index}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        padding: '5px',
        border: '1px solid #ccc'
      }}
    >
      {ingre.name} ({ingre.amount})
    </span>
  ))

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price <strong>USD {price}</strong>
      </p>
    </div>
  )
}

export default Order
