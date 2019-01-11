import React from 'react'
import {clearCart, setCart} from '../store'
import {connect} from 'react-redux'
// import axios from 'axios'

const addToCart = async (product, setCartSize) => {
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
}

const ProductCard = props => {
  const {product, setCartSize} = props
  return (
    <div className="productCard">
      <p>{`product name: ${product.name}`}</p>
      <img src={product.imageUrl} />
      <p>{`description: ${product.description}`}</p>
      <h3>{`price: ${(product.price / 100).toFixed(2)}`}</h3>
      <button type="submit" onClick={() => addToCart(product, setCartSize)}>
        ADD TO CART
      </button>
    </div>
  )
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

export default connect(null, mapDispatch)(ProductCard)
