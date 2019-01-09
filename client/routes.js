import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import {
  Login,
  Signup,
  UserHome,
  ProductList,
  LandingPage,
  Cart
} from './components'
=======
import {Login, Signup, UserHome, ProductList, Checkout} from './components'
>>>>>>> Dev stripe functionality creating
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/products" component={ProductList} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
<<<<<<< HEAD
        <Route path="/landing" component={LandingPage} />
        <Route path="/cart" component={Cart} />
=======
        {/* figure out how to dynamically get name descript */}
        <Route
          path="/checkout"
          render={props => (
            <Checkout
              {...props}
              isAuthed={true}
              name="Cage"
              description="product"
              amount={1}
            />
          )}
        />
>>>>>>> Dev stripe functionality creating
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
