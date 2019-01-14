/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')

  describe('/api/users/:id', () => {
    const codysEmail = 'cody@puppybook.com'
    const odiesEmail = 'odie@puppybook.com'

    describe('GET /api/users/1', async () => {
      beforeEach(async () => {
        await User.create({
          email: codysEmail,
          id: 1
        })
        await User.create({
          email: odiesEmail,
          id: 2
        })
        await Order.create({
          userId: 1,
          orderData: '[{TEST ORDER 1}]'
        })
        await Order.create({
          userId: 2,
          orderData: '[{TEST ORDER 2}]'
        })
        await Order.create({
          userId: 2,
          orderData: '[{TEST ORDER 2-2}]'
        })
      })

      it('returns instance of the correct user', async () => {
        const cody = await request(app)
          .get('/api/users/1')
          .expect(200)
        const odie = await request(app)
          .get('/api/users/2')
          .expect(200)
        expect(cody.body).to.be.an('object')
        expect(cody.body.email).to.be.equal(codysEmail)
        expect(odie.body).to.be.an('object')
        expect(odie.body.email).to.be.equal(odiesEmail)
      })

      it('user is eagerloaded with all associated orders', async () => {
        const cody = await request(app)
          .get('/api/users/1')
          .expect(200)
        const odie = await request(app)
          .get('/api/users/2')
          .expect(200)
        expect(cody.body.orders).to.be.an('array')
        expect(cody.body.orders.length).to.be.equal(1)
        expect(odie.body.orders).to.be.an('array')
        expect(odie.body.orders.length).to.be.equal(2)
      })

      it('eager loaded orders have correct data', async () => {
        const cody = await request(app)
          .get('/api/users/1')
          .expect(200)
        const odie = await request(app)
          .get('/api/users/2')
          .expect(200)
        expect(cody.body.orders[0]).to.be.an('object')
        expect(cody.body.orders[0].orderData).to.be.an('string')
        expect(odie.body.orders[1]).to.be.an('object')
        expect(odie.body.orders[1].orderData).to.be.an('string')
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
