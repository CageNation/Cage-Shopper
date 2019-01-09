const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production' ? 'pk_test' : 'pk_test'

export default STRIPE_PUBLISHABLE
