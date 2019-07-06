import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = props => {
  let arrayIngredients = Object.keys(props.ingredients)
    .map(indexObj =>
      [...Array(props.ingredients[indexObj])].map((_, i) => (
        <BurgerIngredient key={indexObj + i} type={indexObj} />
      ))
    )
    .reduce((arr, ell) => {
      return arr.concat(ell)
    }, [])

  if (arrayIngredients.length === 0) {
    arrayIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {arrayIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default Burger
