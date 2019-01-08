import React from 'react'
// import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom'

const ProductCard = props => {
  const product = props.product
  return (
    <div className="productCard">
      <p>{`product name: ${product.name}`}</p>
      <img src={product.imageUrl} />
      <p>{`description: ${product.description}`}</p>
      <h3>{`price: ${product.price}`}</h3>
    </div>
  )
}

export default ProductCard
