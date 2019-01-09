import React, {Component} from 'react'
// import { connect } from 'react-redux'
// import axios from 'axios'
// import { Link } from 'react-router-dom'

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
  }

  removeProduct(index) {}

  componentDidMount() {
    const items = localStorage.getItem('cart')
    console.log(items)
    let cart = []
    if (items) {
      cart = [...items]
    }
    this.setState({
      cart,
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
            />
          ) : (
            <h1>EMPTY CART</h1>
          )}
        </ul>
      )
    }
  }
}

export default Cart
