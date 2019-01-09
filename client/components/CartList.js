import React, {Component} from 'react'

//NOTE
// When using localStorage you can only use strings
// In order to use arrays you have to use JSON.stringify() and JSON.parse()

class CartList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const products = this.props.products
    let totalPrice = 0
    return (
      <div>
        {products.map((item, idx) => {
          totalPrice += item.price
          return (
            <div key={idx}>
              <span>{item.title}</span>
              <span>{item.description}</span>
              <span>{item.price}</span>
              <span>QTY 1</span>
              <button onClick={() => this.props.removeProduct(idx)}>
                Remove Item
              </button>
              <br />
            </div>
          )
        })}
        <p>-----------------</p>
        <p>
          Total Price:{' '}
          {parseFloat(Math.round(totalPrice * 100) / 100).toFixed(2)}
        </p>
        <button onClick={() => console.log('CLEAR CART')}>CLEAR CART</button>
        <button onClick={() => console.log('CHECKOUT')}>CHECKOUT</button>
      </div>
    )
  }
}

export default CartList
