const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router
// product api routes, handle requests to /api/products/ and make DB requests and send back information as json

// get /api/products/ responds with array of ALL products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
