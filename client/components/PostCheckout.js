import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {clearCart} from '../store'

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
    const id = this.props.userId
    console.log('id:', id)
    let products = localStorage.getItem('cart')
    this.props.emptyCart()
    localStorage.clear()
    try {
      if (id) {
        await axios.put(`/api/users/${id}/cart`, {products, completed: true})
        await axios.post(`/api/users/${id}/cart`)
      } else {
        await axios.post(`/api/users/guestCheckout`, {
          orderData: products,
          completed: true,
          userId: null
        })
      }
    } catch (error) {
      console.error('Postcheckout error: \n', error)
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
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    emptyCart() {
      dispatch(clearCart())
    }
  }
}

export default connect(mapState, mapDispatch)(PostCheckout)
