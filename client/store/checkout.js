//ACTION TYPES:

const CHECKOUT_SUCCESSFUL = 'CHECKOUT_SUCCESSFUL'

//INITIALSTATE:

const success = false

//ACTION CREATORS:

export const setSuccess = status => ({type: CHECKOUT_SUCCESSFUL, status})

// REDUCER:

export default function(state = success, action) {
  switch (action.type) {
    case CHECKOUT_SUCCESSFUL:
      return action.status
    default:
      return state
  }
}
