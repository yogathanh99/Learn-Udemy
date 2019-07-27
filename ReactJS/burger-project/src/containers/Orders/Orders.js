import React, { Component } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders()
  }

  render() {
    const { orders, loading } = this.props
    let ordersComponent = <Spinner />
    if (!loading) {
      ordersComponent = orders.map(order => (
        <Order key={order.id} ingredients={order.ingredients} price={order.price} />
      ))
    }
    return <div>{ordersComponent}</div>
  }
}
const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
})

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actions.fetchOrders())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios))
