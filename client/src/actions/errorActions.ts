/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GET_ERRORS, CLEAR_ERRORS } from './types'

/* THIS RETURNS ERRORS */
/* id is null because it's optional */
export const returnErrors = (msg: any, status: any, id: any = null): any => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  }
}

/* THIS CLEAR ERRORS */
export const clearErrors = (): any => {
  return {
    type: CLEAR_ERRORS
  }
}
