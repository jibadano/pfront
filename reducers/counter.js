import * as actionTypes from '../actions/types'

const initialState = {
  count:0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1
      })
    case actionTypes.DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1
      })
    case actionTypes.RESET:
      return Object.assign({}, state, {
        count: initialState.count
      })
    default: return state
  }
}