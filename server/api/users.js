const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

// /api/users api routes

// get ALL users
router.get('/', async (req, res, next) => {
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
})

// get an individual user by their ID, eager load their saved cart
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.id},
      attributes: ['id', 'email']
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// get users cart
router.get('/:id/cart', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        ordererId: req.params.id,
        completed: false
      },
      attributes: ['orderData']
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

// update users cart with new one from req.body
router.put('/:id/cart', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        ordererId: req.params.id,
        completed: false
      }
    })
    newCart = JSON.stringify(req.body.products)
    await cart.update({
      orderData: newCart,
      completed: !!req.body.completed
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.post('/:id/cart', async (req, res, next) => {
  try {
    await Order.create({ordererId: req.params.id})
  } catch (error) {
    next(error)
  }
})
