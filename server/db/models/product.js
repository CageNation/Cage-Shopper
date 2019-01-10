const Sequelize = require('sequelize')
const db = require('../db')

// OB/LM: consider for the future more validations
const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  // OB/LM: recommend using integer instead (measure in cents) to avoid rounding errors in floating point math (standard out there)
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Product
