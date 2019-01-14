// state for making sure a successful checkout has occured
// used for post checkout procedures, doesn't allow postcheckout to be rendered or for the scripts to run unless this has been set to true
// from our stripe successful payment function

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
