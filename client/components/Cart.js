import React, {Component} from 'react'
import CartList from './CartList'

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

  removeProduct(index) {
    let products = [...this.state.cart]
    console.log('PRODUCTS', products)
    products.splice(index, 1)

    localStorage.setItem('cart', JSON.stringify(products))

    this.setState({
      cart: [...products],
      loading: false
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
