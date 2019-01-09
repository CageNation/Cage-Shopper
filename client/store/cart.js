//ACTION TYPES:

const SET_CART = 'SET_CART'
const CLEAR_CART = 'CLEAR_CART'

//INITIALSTATE:

const empty = 0

//ACTION CREATORS:

export const setCart = length => ({type: SET_CART, length})
export const clearCart = () => ({type: SET_CART})

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
