import React from 'react'
// import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom'

const addToCart = product => {
  const currentItems = JSON.parse(localStorage.getItem('cart'))
  console.log(currentItems)

  if (currentItems === null) {
    const products = [product]
    localStorage.setItem('cart', JSON.stringify(products))
    console.log(products)
  } else {
    const products = [...currentItems, product]
    localStorage.setItem('cart', JSON.stringify(products))
    console.log(products)
  }
}

const ProductCard = props => {
  const product = props.product
  return (
    <div className="productCard">
      <p>{`product name: ${product.name}`}</p>
      <img src={product.imageUrl} />
      <p>{`description: ${product.description}`}</p>
      <h3>{`price: ${product.price}`}</h3>
      <button type="submit" onClick={() => addToCart(product)}>
        ADD TO CART
      </button>
    </div>
  )
}

export default ProductCard
