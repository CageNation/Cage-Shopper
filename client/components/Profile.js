import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Table} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const Profile = props => {
  const {user} = props
  const orders = user.orders
  let totalPrice

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <h4>
        This is your personal account page. Too bad there's nothing for you to
        do here :(
      </h4>

      {orders ? (
        <div>
          <h2>Orders</h2>
          {orders.map((order, idx) => {
            totalPrice = 0
            const products = JSON.parse(orders[idx].orderData)
            return (
              <Table size="large" key={idx}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Order #{order.id}</Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {products.map((product, idx) => {
                    totalPrice += product.price
                    return (
                      <Table.Row key={idx}>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>{product.description}</Table.Cell>
                        <Table.Cell>
                          {(product.price / 100).toFixed(2)}
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
                    <Table.HeaderCell>
                      {(totalPrice / 100).toFixed(2)}
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Footer>
              </Table>
            )
          })}
        </div>
      ) : (
        <div>No Orders</div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(Profile)

/**
 * PROP TYPES
 */
Profile.propTypes = {
  email: PropTypes.string
}
