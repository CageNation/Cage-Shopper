import React from 'react'
import Checkout from './Checkout/Checkout'
import {Button} from 'semantic-ui-react'

//NOTE
// When using localStorage you can only use strings
// In order to use arrays you have to use JSON.stringify() and JSON.parse()
export const CartList = props => {
  const {products, removeProduct, clearCart} = props
  let totalPrice = 0
  return (
    <div>
      {products.map((item, idx) => {
        totalPrice += item.price
        return (
          <div key={idx}>
            <span>{item.title}</span>
            <span>{item.description}</span>
            <span>{(item.price / 100).toFixed(2)}</span>
            <span>QTY 1</span>
            <button onClick={() => removeProduct(idx)}>Remove Item</button>
            <br />
          </div>
        )
      })}
      <p>-----------------</p>
      <p>Total Price: {(totalPrice / 100).toFixed(2)}</p>
      <button onClick={() => clearCart()}>CLEAR CART</button>
      <Checkout
        {...props}
        isAuthed={true}
        name="PAY FOR YOUR ORDER"
        description="Cage Match Checkout"
        amount={totalPrice}
      />
      <Button>Click Here TEST</Button>
    </div>
  )
}

export default CartList
