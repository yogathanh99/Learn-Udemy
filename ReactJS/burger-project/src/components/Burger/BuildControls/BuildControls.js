import React from 'react'

import classes from './BuildControls.css'
import BuilControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = props => {
  const { price, ingredientAdded, ingredientRemoved, disabled, purchase, ordered, isAuth } = props
  console.log(props)
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>{price.toFixed(2)}</strong>
      </p>
      {controls.map(control => (
        <BuilControl
          key={control.label}
          label={control.label}
          added={() => ingredientAdded(control.type)}
          removed={() => ingredientRemoved(control.type)}
          disabled={disabled[control.type]}
        />
      ))}
      <button className={classes.OrderButton} disabled={!purchase} onClick={ordered}>
        {isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
      </button>
    </div>
  )
}

export default buildControls
