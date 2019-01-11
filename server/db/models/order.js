const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define(
  'order',
  {
    total: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    orderData: {
      type: Sequelize.TEXT,
      allowNull: false
    },
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
