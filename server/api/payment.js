const stripe = require('../constants/stripe')

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr})
  } else {
    res.status(200).send({success: stripeRes})
  }
}

const paymentApi = app => {
  app.get('/', (req, res) => {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString()
    })
  })

  app.post('/', (req, res) => {
    // OB/LM: client can define charge amount (not good), sanitize the request body (recommend util method for this)
    stripe.charges.create(req.body, postStripeCharge(res))
  })

  return app
}

module.exports = paymentApi
