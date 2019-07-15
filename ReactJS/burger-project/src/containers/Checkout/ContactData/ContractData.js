import React from 'react'
import axios from '../../../axios-orders'

import classes from './ContractData.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends React.Component {
  state = {
    name: '',
    emaii: '',
    address: {
      street: '',
      posttalCode: ''
    },
    loading: false
  }

  orderHandler = e => {
    e.preventDefault()
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Your Street" />
        <input type="text" name="postal" placeholder="Your Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
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

export default ContactData
