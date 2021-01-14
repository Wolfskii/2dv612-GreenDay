/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-anonymous-default-export */
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

/* Create initial state for error */
const initialState = {
  msg: {}, // from server
  status: {}, // from server
  id: {} // for grabbing certain errors within a component
}

export default function (state: any = initialState, action: any): any {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      }
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      }
    default:
      return state
  }
}
