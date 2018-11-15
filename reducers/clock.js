import * as actionTypes from '../actions/types'

const initialState = {
  lastUpdate: 0,
  light: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light
      })
    default: return state
  }
}