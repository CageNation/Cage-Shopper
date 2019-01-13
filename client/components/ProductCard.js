import React from 'react'
import {clearCart, setCart} from '../store'
import {connect} from 'react-redux'
import axios from 'axios'

import {Button, Icon, Image, Item, Label} from 'semantic-ui-react'

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
    await axios.put(`/api/users/${user.id}/cart`, {products})
  }
}

const ProductCard = props => {
  const {product, setCartSize, user} = props
  // return (
  //   <div className="productCard">
  //     <p>{`product name: ${product.name}`}</p>
  //     <img src={product.imageUrl} />
  //     <p>{`description: ${product.description}`}</p>
  //     <h3>{`price: ${(product.price / 100).toFixed(2)}`}</h3>
  //     <button
  //       type="submit"
  //       onClick={() => addToCart(product, setCartSize, user)}
  //     >
  //       ADD TO CART
  //     </button>
  //   </div>
  // )

  return (
    <Item.Group divided>
      <Item>
        <Item.Image src={product.imageUrl} />

        <Item.Content>
          <Item.Header as="a">{product.name}</Item.Header>
          <Item.Meta>
            <span className="cinema">Description:</span>
          </Item.Meta>
          <Item.Description>{product.description}</Item.Description>
          <Item.Extra>
            <Button
              onClick={() => addToCart(product, setCartSize, user)}
              primary
              floated="right"
            >
              ADD TO CART
              <Icon name="right chevron" />
            </Button>
            <Label>Details</Label>
            <Label>Details</Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
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
