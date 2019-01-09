import React, {Component} from 'react'
import CartList from './CartList'
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
    const products = JSON.parse(items)
    //console.log(products)

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
            // this.state.cart.map(item => {
            //   return (
            //     // <div>
            //     //   <span>{item.name}</span>
            //     //   <span>{item.description}</span>
            //     //   <span>{item.price}</span>

            //     // </div>

            //   )
            //})
            <h1>EMPTY CART</h1>
          )}
        </ul>
      )
    }
  }
}

export default Cart
