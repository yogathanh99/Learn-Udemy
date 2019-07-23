import React from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'

import classes from './ContractData.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest'
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest'
            }
          ]
        },
        validation: {},
        value: 'fastest',
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  }

  orderHandler = e => {
    e.preventDefault()
    this.setState({ loading: true })
    const orderData = {}

    for (let formElement in this.state.orderForm) {
      orderData[formElement] = this.state.orderForm[formElement].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      order: orderData
    }
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false
        })
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({
          loading: false
        })
      })
  }

  checkValidation = (value, rule) => {
    let isValid = true

    if (rule.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid
    }

    if (rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid
    }

    return isValid
  }

  inputFormHandler = (e, inputIdentifier) => {
    const updateForm = {
      ...this.state.orderForm
    }

    const updateFormElement = {
      ...updateForm[inputIdentifier]
    }

    updateFormElement.value = e.target.value
    updateFormElement.valid = this.checkValidation(
      updateFormElement.value,
      updateFormElement.validation
    )
    updateFormElement.touched = true
    updateForm[inputIdentifier] = updateFormElement
    let formIsValid = true
    for (let formElement in updateForm) {
      formIsValid = updateForm[formElement].valid && formIsValid
    }

    this.setState({
      orderForm: updateForm,
      formIsValid
    })
  }

  render() {
    let formElementArray = []
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            isTouched={formElement.config.touched}
            changed={e => this.inputFormHandler(e, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    )
    if (this.state.loading) form = <Spinner />

    return (
      <div className={classes.ContactData}>
        <h4>Enter yout Contact</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = ({ ingredients, totalPrice }) => ({
  ingredients: ingredients,
  totalPrice: totalPrice
})

export default connect(mapStateToProps)(ContactData)
