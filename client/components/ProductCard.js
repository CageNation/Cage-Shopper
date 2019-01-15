import React from 'react'
import {clearCart, setCart} from '../store'
import {connect} from 'react-redux'
import axios from 'axios'

import {Button, Icon, Item, Label} from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser'

const addToCart = async (product, setCartSize, user) => {
  const currentItems = JSON.parse(localStorage.getItem('cart'))

  let products = []
  if (currentItems === null) {
    products = [product]
    setCartSize(1)
    localStorage.setItem('cart', JSON.stringify(products))
  } else {
    products = [...currentItems, product]
    setCartSize(products.length)
    localStorage.setItem('cart', JSON.stringify(products))
  }
  if (user.id) {
    try {
      await axios.put(`/api/users/${user.id}/cart`, {products})
    } catch (error) {
      console.error(error)
    }
  }
}

const ProductCard = props => {
  const {product, setCartSize, user} = props

  return (
    <div className="ui centered card product-card">
      <Item.Group divided>
        <Item>
          <Item.Image src={product.imageUrl} />

          <Item.Content>
            <Item.Header as="a">{product.name}</Item.Header>
            <Item.Meta>
              <span className="product description">Description:</span>
            </Item.Meta>
            <Item.Description>
              {ReactHtmlParser(product.description)}
            </Item.Description>

            <Item.Extra>
              <Button
                onClick={() => addToCart(product, setCartSize, user)}
                primary
                floated="right"
              >
                ADD TO CART
                {/* <Icon name="right chevron" /> */}
              </Button>
            </Item.Extra>
            <Item.Header>
              Price: ${(product.price / 100).toFixed(2)}
            </Item.Header>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    emptyCart() {
      dispatch(clearCart())
    },
    setCartSize(length) {
      dispatch(setCart(length))
    }
  }
}

export default connect(mapState, mapDispatch)(ProductCard)
