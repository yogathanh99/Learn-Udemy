import React from 'react'
import classes from './Input.css'

const Input = props => {
  const {
    elementType,
    elementConfig,
    label,
    value,
    changed,
    invalid,
    shouldValidate,
    isTouched
  } = props
  let inputElement = null
  const inputClassed = [classes.InputElement]

  if (invalid && shouldValidate && isTouched) {
    inputClassed.push(classes.Invalid)
  }

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClassed.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      )
      break
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClassed.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      )
      break
    case 'select':
      inputElement = (
        <select className={inputClassed.join(' ')} value={value} onChange={changed}>
          {elementConfig.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      )
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  )
}

export default Input
