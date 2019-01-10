import React from 'react'
import Checkout from './Checkout/Checkout'
import {Button, Table} from 'semantic-ui-react'

//NOTE
// When using localStorage you can only use strings
// In order to use arrays you have to use JSON.stringify() and JSON.parse()
export const CartList = props => {
  const {products, removeProduct, clearCart} = props
  let totalPrice = 0
  return (
    <div>
      <Table size="large">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((item, idx) => {
            totalPrice += item.price
            return (
              <Table.Row key={idx}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{(item.price / 100).toFixed(2)}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => removeProduct(idx)}>X</Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>
              <b>Total Price</b>
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell>{(totalPrice / 100).toFixed(2)}</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>
      <Button onClick={() => clearCart()}>CLEAR CART</Button>
      <Checkout
        {...props}
        isAuthed={true}
        name="PAY FOR YOUR ORDER"
        description="Cage Match Checkout"
        amount={totalPrice}
      />
    </div>
  )
}

export default CartList
