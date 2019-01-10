import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartList from './CartList'
import {clearCart, setCart} from '../store'

//NOTE
// When using localStorage you can only use strings
// In order to use arrays you have to use JSON.stringify() and JSON.parse()

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

  removeProduct(index) {
    let products = [...this.state.cart]
    products.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(products))
    this.props.setCartSize(products.length)
    this.setState({
      cart: [...products],
      loading: false
    })
  }

  clearCart() {
    localStorage.clear()
    this.props.emptyCart()
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
        <ul>
          {this.state.cart.length ? (
            <CartList
              products={this.state.cart}
              removeProduct={this.removeProduct}
              clearCart={this.clearCart}
            />
          ) : (
            <h1>EMPTY CART</h1>
          )}
        </ul>
      )
    }
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

export default connect(null, mapDispatch)(Cart)
