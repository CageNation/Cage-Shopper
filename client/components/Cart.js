import React, {Component} from 'react'
import CartList from './CartList'

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
