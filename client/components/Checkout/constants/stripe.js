const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_O9IIzZ75ZmAq1cxyUrFhMMNM'
    : 'pk_test_O9IIzZ75ZmAq1cxyUrFhMMNM'

export default STRIPE_PUBLISHABLE
