/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar'
export {default as Profile} from './Profile'
export {default as ProductList} from './ProductList'
export {default as FeaturedProduct} from './FeaturedProduct'
export {default as Cart} from './Cart'
export {default as Checkout} from './Checkout/Checkout'
export {default as PostCheckout} from './PostCheckout'
export {default as HomePage} from './HomePage'
export {Login, Signup} from './AuthForm'
