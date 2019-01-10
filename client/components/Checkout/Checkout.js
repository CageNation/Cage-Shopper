import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

import STRIPE_PUBLISHABLE from './constants/stripe'
import PAYMENT_SERVER_URL from './constants/server'

const CURRENCY = 'USD'

// function may not need
const fromEuroToCent = amount => amount * 100

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  // OB/LM: consider "toast" notification instead (e.g. using react-toastr: https://seesparkbox.com/foundry/semantic_commit_messages)
  alert('Payment Error')
}

// OB/LM: could use async / await below
const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: amount
    })
    .then(successPayment)
    .catch(errorPayment)

const Checkout = ({name, description, amount}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={amount}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
)

export default Checkout
