import React from 'react'
import {clearCart, setCart} from '../store'
import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom'

const addToCart = (product, setCartSize) => {
  const currentItems = JSON.parse(localStorage.getItem('cart'))
  console.log(currentItems)

  if (currentItems === null) {
    const products = [product]
    setCartSize(1)
    localStorage.setItem('cart', JSON.stringify(products))
    console.log(products)
  } else {
    const products = [...currentItems, product]
    setCartSize(products.length)
    localStorage.setItem('cart', JSON.stringify(products))
    console.log(products)
  }
}

const ProductCard = props => {
  const {product, setCartSize} = props
  return (
    <div className="productCard">
      <p>{`product name: ${product.name}`}</p>
      <img src={product.imageUrl} />
      <p>{`description: ${product.description}`}</p>
      <h3>{`price: ${product.price}`}</h3>
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
