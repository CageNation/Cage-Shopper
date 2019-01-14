// state for our cart badge in the navbar
// we check the size of our cart in localstorage and set/clear the number with this store to allow the badge to dynamically render the cart size

//ACTION TYPES:

const SET_CART = 'SET_CART'
const CLEAR_CART = 'CLEAR_CART'

//INITIALSTATE:

const empty = 0

//ACTION CREATORS:

export const setCart = length => ({type: SET_CART, length})
export const clearCart = () => ({type: CLEAR_CART})

// REDUCER:

export default function(state = empty, action) {
  switch (action.type) {
    case SET_CART:
      return action.length
    case CLEAR_CART:
      return empty
    default:
      return state
  }
}
