import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink, withRouter} from 'react-router-dom'
import {logout} from '../store'

import {Button, Container, Menu, Visibility, Segment} from 'semantic-ui-react'

class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  hideFixedMenu = () => this.setState({fixed: false})
  showFixedMenu = () => this.setState({fixed: true})

  render() {
    const {handleClick, isLoggedIn, cartSize} = this.props
    const {fixed} = this.state

    return (
      <div>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{minHeight: 70, padding: '1em 0em'}}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as={NavLink} exact to="/">
                  Home
                </Menu.Item>
                <Menu.Item as={NavLink} exact to="/products">
                  See our Products!
                </Menu.Item>
                <Menu.Item as={NavLink} exact to="/cart">
                  <i className="shopping cart icon" />
                  {cartSize}
                </Menu.Item>
                <Menu.Item position="right">
                  {isLoggedIn ? (
                    <React.Fragment>
                      <Link to="/account">
                        <Button inverted={!fixed}>
                          {/* The navbar will show these links after you log in */}
                          Account Page
                        </Button>
                      </Link>
                      <Button
                        inverted={!fixed}
                        primary={fixed}
                        style={{marginLeft: '0.5em'}}
                        onClick={handleClick}
                      >
                        Logout
                      </Button>
                    </React.Fragment>
                  ) : (
                    <div>
                      {/* The navbar will show these links before you log in */}
                      <Link to="/login">
                        <Button inverted={!fixed}>Login</Button>
                      </Link>
                      <Link to="/signup">
                        <Button
                          inverted={!fixed}
                          primary={fixed}
                          style={{marginLeft: '0.5em'}}
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartSize: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
