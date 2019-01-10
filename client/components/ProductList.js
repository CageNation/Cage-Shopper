import React, {Component} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'

class ProductList extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      loading: true
    }
  }

  async componentDidMount() {
    const {data: products} = await axios.get('/api/products')
    this.setState({
      products,
      loading: false
    })
  }

  render() {
    if (this.state.loading) {
      return <h1>LOADING PRODUCTS...</h1>
    } else {
      return (
        <ul>
          {this.state.products.length ? (
            this.state.products.map(product => {
              return <ProductCard key={product.id} product={product} />
            })
          ) : (
            <h1>NO PRODUCTS IN DATABASE</h1>
          )}
        </ul>
      )
    }
  }
}

export default ProductList
