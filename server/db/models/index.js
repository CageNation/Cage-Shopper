const User = require('./user')
const Product = require('./product')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Order)
Order.belongsTo(User)
// associations allow us to eager load a users orders and cart
// in this case a users 'cart' is just an order instance that is flagged with completed: false
// a user will only ever have one 'cart', while many finalized orders could be associated with the user, they will be stored with completed: true

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order
}
