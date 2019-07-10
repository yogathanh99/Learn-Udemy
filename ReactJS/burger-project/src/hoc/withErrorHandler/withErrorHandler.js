import React from 'react'

import Aux from '../Aux'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null
    }
    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        })
        return req
      })

      this.resInterceptors = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({
            error: error
          })
        }
      )
    }

    componentWillUnmount() {
      axios.interceptors.request.reject(this.reqInterceptors)
      axios.interceptors.response.reject(this.resInterceptors)
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      })
    }

    render() {
      const {
        state: { error },
        errorConfirmedHandler,
        props
      } = this

      return (
        <Aux>
          <Modal show={error} modalClosed={errorConfirmedHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler
