import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartList from './CartList'
import {clearCart, setCart} from '../store'
import axios from 'axios'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      cart: [],
      loading: true
    }
    this.removeProduct = this.removeProduct.bind(this)
    this.clearCart = this.clearCart.bind(this)
  }

  async removeProduct(index) {
    let products = [...this.state.cart]
    const user = this.props.user
    products.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(products))
    this.props.setCartSize(products.length)
    if (user.id) {
      try {
        await axios.put(`/api/users/${user.id}/cart`, {products})
      } catch (error) {
        console.error(error)
      }
    }
    this.setState({
      cart: [...products],
      loading: false
    })
  }

  async clearCart() {
    localStorage.clear()
    this.props.emptyCart()
    const user = this.props.user
    if (user.id) {
      try {
        await axios.put(`/api/users/${user.id}/cart`, {products: []})
      } catch (error) {
        console.error(error)
      }
    }
    this.setState({
      cart: []
    })
  }

  componentDidMount() {
    const items = localStorage.getItem('cart')

    let products = []
    if (items) {
      products = JSON.parse(items)
    }
    this.setState({
      cart: [...products],
      loading: false
    })
  }

  render() {
    if (this.state.loading) {
      return <h1>LOADING CART...</h1>
    } else {
      return (
        <div>
          {this.state.cart.length ? (
            <CartList
              products={this.state.cart}
              removeProduct={this.removeProduct}
              clearCart={this.clearCart}
            />
          ) : (
            <h1>EMPTY CART</h1>
          )}
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    emptyCart() {
      dispatch(clearCart())
    },
    setCartSize(length) {
      dispatch(setCart(length))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
