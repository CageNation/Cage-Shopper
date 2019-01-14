import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {clearCart, setSuccess} from '../store'
import history from '../history'

/*
- clear local storage cart
- clear redux cart size
- complete order on DB (change completed flag to true)
    await axios.put(`/api/users/${user.id}/cart`, {products, completed: true})
- create a new 'cart' blank order for the user:
    await Order.create({ordererId: user.id})
*/

class PostCheckout extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    const {userId, checkoutStatus, emptyCart, toggleSuccess} = this.props
    // before doing anything, check that our checkout status has been set to true in redux state
    if (checkoutStatus) {
      // if it has, grab the order data from local storage, empty cart size on state, empty local storage
      let products = localStorage.getItem('cart')
      emptyCart()
      localStorage.clear()
      try {
        // check if a user is logged in
        if (userId) {
          // if they are, store the finalized order and set its completed status to true
          await axios.put(`/api/users/${userId}/cart`, {
            products,
            completed: true
          })
          // then create a new 'cart' for them
          await axios.post(`/api/users/${userId}/cart`)
        } else {
          // if no user logged in just save the guest order in the db with no userid
          await axios.post(`/api/users/guestCheckout`, {
            orderData: products,
            completed: true,
            userId: null
          })
        }
      } catch (error) {
        console.error('Postcheckout error: \n', error)
      }
      toggleSuccess(false)
    } else {
      // if we have come to this component from anywhere but our payment success function, just redirect and dont run any code
      history.push('/cart')
    }
  }

  render() {
    return (
      <div>
        <h1>ORDER COMPLETE</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    checkoutStatus: state.checkout
  }
}

const mapDispatch = dispatch => {
  return {
    emptyCart() {
      dispatch(clearCart())
    },
    toggleSuccess(status) {
      dispatch(setSuccess(status))
    }
  }
}

export default connect(mapState, mapDispatch)(PostCheckout)
