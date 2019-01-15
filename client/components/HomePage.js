import PropTypes from 'prop-types'
import React, {Component} from 'react'
import FeaturedProduct from './FeaturedProduct'
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

// OB/LM: listen to linter
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
class HomepageHeading extends React.Component {
  render() {
    return (
      <Container text>
        <Header
          className="home-page-header"
          as="h1"
          content="Cage Shopper"
          inverted
        />
        <Header
          className="home-page-subheader"
          as="h2"
          content="All Nicholas Cage Merchandise You Could Ever Want"
          inverted
        />

        <Button primary as={NavLink} exact to="/products">
          Get Started
          <Icon name="right arrow" />
        </Button>
      </Container>
    )
  }
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
}

class DesktopContainer extends Component {
  state = {}

  render() {
    const {children} = this.props

    return (
      <React.Fragment>
        <Segment
          className="home-page-main-header"
          inverted
          textAlign="center"
          vertical
        >
          <HomepageHeading />
        </Segment>
        {children}
      </React.Fragment>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
}

const ResponsiveContainer = ({children}) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

class HomePage extends React.Component {
  render() {
    return (
      <ResponsiveContainer>
        <Header as="h1" textAlign="center" className="home-page-grid-header">
          FEATURED PRODUCT
        </Header>
        <Segment className="home-page-body">
          <FeaturedProduct />
        </Segment>
        <Segment vertical inverted className="home-page-body">
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header inverted as="h3" className="home-page-grid-header">
                  We Help Shoppers
                </Header>
                <p>
                  We can give you the best and latest Nicolas Cage Merchandise
                  on the market today. We empower the Nicolas Cage fan through
                  our relentless pursuit creating Nicolas Cage Merchandise
                  whether they be worshippers of the Cage or not! Everyone is
                  welcome in the eyes of the Great Nic and we may all bask in
                  his great presence!
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src="https://cdn3-www.comingsoon.net/assets/uploads/2018/08/conair.jpg"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row />
          </Grid>
        </Segment>
        <Segment vertical className="home-page-body">
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              <Grid.Column className="home-page-grid">
                <Header as="h3" className="home-page-grid-header">
                  "Best Nic Cage Merchandize!!!"
                </Header>
                <p>That is what they all say about us</p>
              </Grid.Column>
              <Grid.Column className="home-page-grid">
                <Header as="h3" className="home-page-grid-header">
                  "A place celebrating our true lord and savior Nic like nowhere
                  else. Bow down and give them all your money!"
                </Header>
                <p>Steven Seagall, Head Priest of the Church of Cage</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment inverted vertical className="home-page-body">
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a">
                      <a href="https://lotro-wiki.com/images/0/0b/Mordor_map.jpg">
                        Sitemap
                      </a>
                    </List.Item>
                    <List.Item as="a">
                      <a href="https://i.chzbgr.com/full/1464005376/hE7B99BFA/">
                        Contact Us
                      </a>
                    </List.Item>
                    <List.Item as="a">
                      <a href="https://www.reddit.com/r/onetruegod/">
                        Religious Ceremonies
                      </a>
                    </List.Item>
                    <List.Item as="a">
                      <a href="https://image.jimcdn.com/app/cms/image/transf/none/path/s40c423127565d23a/image/i04f1f19b40a059c3/version/1441290841/image.jpg">
                        Gazebo Plans
                      </a>
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header inverted as="h4" content="Services" />
                  <List link inverted>
                    <List.Item as="a">Banana Pre-Order</List.Item>
                    <List.Item as="a">DNA FAQ</List.Item>
                    <List.Item as="a">How To Access</List.Item>
                    <List.Item as="a">Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header as="h4" inverted>
                    CALL FOR CUSTOM ORDERS!!!
                  </Header>
                  <p>
                    <b>Phone:</b> 481-516-2342
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </ResponsiveContainer>
    )
  }
}
export default HomePage
