/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  const productTest = {
    name: 'TESTING NAME',
    description: 'TESTING DESCRIPTION',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQK6qOss-CBtaLiUgrgLabx8oQY3KdGiYMC0ca2GDgXkkvNZUL_e1-oSadQksyl1XLI8amjUEga&usqp=CAE',
    price: 1000
  }
  const productTest2 = {
    name: 'TESTING NAME 2',
    description: 'TESTING DESCRIPTION 2',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQK6qOss-CBtaLiUgrgLabx8oQY3KdGiYMC0ca2GDgXkkvNZUL_e1-oSadQksyl1XLI8amjUEga&usqp=CAE',
    price: 1002
  }

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.create(productTest)
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(productTest.name)
      expect(res.body[0].description).to.be.equal(productTest.description)
      expect(res.body[0].price).to.be.equal(productTest.price)
    })
  }) // end describe('/api/products')

  describe('/api/products/:id', () => {
    beforeEach(() => {
      return Product.create(productTest)
    })
    beforeEach(() => {
      return Product.create(productTest2)
    })

    it('GET /api/products/1', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(productTest.name)
      expect(res.body.description).to.be.equal(productTest.description)
      expect(res.body.price).to.be.equal(productTest.price)
    })
    it('GET /api/products/2', async () => {
      const res = await request(app)
        .get('/api/products/2')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(productTest2.name)
      expect(res.body.description).to.be.equal(productTest2.description)
      expect(res.body.price).to.be.equal(productTest2.price)
    })
  }) // end describe('/api/products":id')
}) // end describe('Product routes')
