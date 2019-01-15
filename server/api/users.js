const router = require('express').Router()
const {User, Order} = require('../db/models')
const {checkUser} = require('./utils')
module.exports = router

// /api/users api routes

// GET /api/users
// get ALL users
router.get('/', async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    } catch (err) {
      next(err)
    }
  }
  // OB/LM: missing else
})

// GET api/users/:id
// get an individual user by their ID, eager load their saved cart
router.get('/:id', checkUser, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.id},
      include: [{model: Order, where: {userId: req.params.id}}],
      attributes: ['id', 'email']
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// GET /api/users/:id/cart
// get users cart
router.get('/:id/cart', checkUser, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.id,
        completed: false
      },
      attributes: ['orderData']
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

// PUT /api/users/:id/cart
// sync users cart with new one from req.body, will also take a completed status in body to toggle from cart to completed order
router.put('/:id/cart', checkUser, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.id,
        completed: false
      }
    })
    await cart.update({
      orderData: req.body.products,
      completed: !!req.body.completed
    })
    // OB/LM: consider moving the innards of the POST logic below to here (detect if a new cart needs to be made and make it)
    res.sendStatus(201)
  } catch (error) {
    // OB/LM: firewood here, burn it
    console.log('PUT CART ERROR')
    next(error)
  }
})

// POST /api/users/:id/cart
// creates a new 'cart' for the assigned user, an order that is completed: false and is assigned the user
// only user after completing the current 'cart' order after a stripe verification!

router.post('/:id/cart', checkUser, async (req, res, next) => {
  try {
    await Order.create({userId: req.params.id})
    res.sendStatus(201)
  } catch (error) {
    console.log('POST CART ERROR')
    next(error)
  }
})

// POST /api/users/guestCheckout
// saves a completed guest order in DB with userId null

// OB/LM: could be a POST /api/orders instead (more RESTful)
router.post('/guestCheckout', async (req, res, next) => {
  try {
    // OB/LM: web security issue, client can define the price of the order, maybe you want a method to calculate it
    await Order.create(req.body)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})
