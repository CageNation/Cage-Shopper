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
      include: [{model: Order}, 'cart'],
      attributes: ['id', 'email']
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// add an item to the users 'cart'
router.put('/:id/sync_cart', async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})
