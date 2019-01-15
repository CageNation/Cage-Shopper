import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Accordion, Table, Menu} from 'semantic-ui-react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'

/**
 * COMPONENT
 */
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {orders: []}
  }

  async componentDidMount() {
    const user = await axios.get(`/api/users/${this.props.user.id}`)
    this.setState({orders: user.data.orders})
  }

  render() {
    const {orders} = this.state
    let totalPrice = 0
    return (
      <div>
        <h1>Welcome, {this.props.user.email}</h1>
        <h4>This is your personal account page.</h4>

        {orders ? (
          <div>
            <h2>Order History</h2>
            {orders.reverse().map((order, idx) => {
              this.totalPrice = 0
              const products = JSON.parse(orders[idx].orderData)
              const orderNumber = `Order #${1000 + order.id}`

              if (order.completed) {
                return (
                  <React.Fragment key={orderNumber}>
                    <Accordion
                      panels={[
                        {
                          key: orderNumber,
                          title: orderNumber,
                          content: {
                            content: orderTable(order.id, products, totalPrice)
                          }
                        }
                      ]}
                    />
                  </React.Fragment>
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

const orderTable = (id, products, totalPrice) => {
  return (
    <Table size="large" key={id}>
      <Table.Header>
        {/* <Table.Row>
          <Table.HeaderCell>
            Order #{1000 + id}
          </Table.HeaderCell>
        </Table.Row> */}
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
              <Table.Cell>{ReactHtmlParser(product.description)}</Table.Cell>
              <Table.Cell>{(product.price / 100).toFixed(2)}</Table.Cell>
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
