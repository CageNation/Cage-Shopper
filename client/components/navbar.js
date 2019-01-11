import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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
    //{children} = this.props
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
                <Menu.Item as="a" active>
                  <Link to="/landing">Home</Link>
                </Menu.Item>
                <Menu.Item as="a">
                  <Link to="/products">See our Products!</Link>
                </Menu.Item>
                <Menu.Item as="a">
                  <Link to="/users">Users List(TODO)</Link>
                </Menu.Item>
                <Menu.Item as="a">
                  <Link to="/cart">{`CART(${cartSize})`}</Link>
                </Menu.Item>
                <Menu.Item position="right">
                  {/* <Button as="a" inverted={!fixed}>
            Log in
          </Button>
          <Button
            as="a"
            inverted={!fixed}
            primary={fixed}
            style={{marginLeft: '0.5em'}}
          >
            Sign Up
          </Button> */}
                  {isLoggedIn ? (
                    <React.Fragment>
                      <Button as="a" inverted={!fixed}>
                        {/* The navbar will show these links after you log in */}
                        <Link to="/home">Account Page</Link>
                      </Button>
                      <Button
                        as="a"
                        inverted={!fixed}
                        primary={fixed}
                        style={{marginLeft: '0.5em'}}
                      >
                        <a href="#" onClick={handleClick}>
                          Logout
                        </a>
                      </Button>
                    </React.Fragment>
                  ) : (
                    <div>
                      {/* The navbar will show these links before you log in */}
                      <Button as="a" inverted={!fixed}>
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button
                        as="a"
                        inverted={!fixed}
                        primary={fixed}
                        style={{marginLeft: '0.5em'}}
                      >
                        <Link to="/signup">Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Account Page</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
        <hr />
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
