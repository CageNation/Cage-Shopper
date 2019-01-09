import React, {Component} from 'react'
// import { connect } from 'react-redux'
import axios from 'axios'
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
  }

  componentDidMount() {
    //localStorage.setItem('cart', ['helloCart']);

    const items = localStorage.getItem('cart')
    console.log(items)

    this.setState({
      cart: [...items],
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
            this.state.cart.map(item => {
              return item
            })
          ) : (
            <h1>EMPTY CART</h1>
          )}
        </ul>
      )
    }
  }
}

export default Cart
