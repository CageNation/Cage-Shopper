import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Table} from 'semantic-ui-react'
import axios from 'axios'

/**
 * COMPONENT
 */
class Profile extends React.Component {
  constructor(props) {
    super(props)
    // const {user} = props
    // let totalPrice

    this.state = {orders: []}
  }

  async componentDidMount() {
    const user = await axios.get(`/api/users/${this.props.user.id}`)
    console.log('USER: ', this.props.user)
    console.log('USER WITH ORDERS', user.data.orders)
    this.setState(...this.state.orders, {orders: user.data.orders})
  }

  render() {
    const orders = this.state.orders
    let totalPrice = 0
    console.log('ORDERS', orders)
    return (
      <div>
        <h1>Welcome, {this.props.user.email}</h1>
        <h4>
          This is your personal account page. Too bad there's nothing for you to
          do here :(
        </h4>

        {orders ? (
          <div>
            <h2>Order History</h2>
            {orders.map((order, idx) => {
              this.totalPrice = 0
              const products = JSON.parse(orders[idx].orderData)
              //console.log("PRODUCTS", products)
              if (order.completed) {
                return (
                  <Table size="large" key={order.id}>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>
                          Order #{1000 + order.id}
                        </Table.HeaderCell>
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
                          <Table.Row key={idx + product.name}>
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
              } else {
                return <div />
              }
            })}
          </div>
        ) : (
          <div>No Orders</div>
        )}
      </div>
    )
  }
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
