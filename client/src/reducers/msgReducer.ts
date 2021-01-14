/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-anonymous-default-export */
import { MESSAGE_SUCCESS } from '../actions/types'

/* Create initial state for msg */
const initialState = {
  messages: null
}

export default function (state: any = initialState, action: any): any {
  switch (action.type) {
    case MESSAGE_SUCCESS:
      return {
        ...state,
        messages: action.payload
      }
    default:
      return state
  }
}
