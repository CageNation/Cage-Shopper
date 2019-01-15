import React, {Component} from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'

/**
 * COMPONENT
 */
class FeaturedProduct extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      loading: true
    }
  }

  async componentDidMount() {
    try {
      const {data: products} = await axios.get('/api/products')
      this.setState({
        products,
        loading: false
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    if (this.state.loading) {
      return <h1>LOADING...</h1>
    } else {
      let idx = Math.floor(
        Math.random() * Math.floor(this.state.products.length)
      )
      const featuredProd = this.state.products[idx]
      return <ProductCard product={featuredProd} />
    }
  }
}

export default FeaturedProduct
