import React, {Component} from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'

/**
 * COMPONENT
 */
class LandingPage extends Component {
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
    } catch (error) {
      console.error(error)
    }
    this.setState({
      products,
      loading: false
    })
  }

  render() {
    if (this.state.loading) {
      return <h1>LOADING...</h1>
    } else {
      let idx = Math.floor(
        Math.random() * Math.floor(this.state.products.length)
      )
      const featuredProd = this.state.products[idx]
      return (
        <div>
          <h1>WELCOME TO THE CAGE MATCH!</h1>
          <h2>FEATURED PRODUCT:</h2>
          <ProductCard product={featuredProd} />
        </div>
      )
    }
  }
}

export default LandingPage
