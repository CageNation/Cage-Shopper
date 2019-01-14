const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define(
  'order',
  {
    // storing total in cents as an integer(divide by 100 to get total in dollars)
    total: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    // we are storing our orderData as a stringified JSON object rather than with associations
    orderData: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '[]'
    },
    // flag to differentiate a users past completed orders with their current uncompleted order(their 'cart')
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    hooks: {
      beforeValidate: function(order) {
        if (typeof order.orderData !== 'string') {
          order.orderData = JSON.stringify(order.orderData)
        }
      }
    }
  }
)

module.exports = Order
