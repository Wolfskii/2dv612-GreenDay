import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { MESSAGE_SUCCESS } from './types'

/* Functions */
import { token } from '../assets/functions/getTokenFromLocalStorage'

const config: any = {
  headers: {
    'Content-type': 'application/json',
    'x-auth-token': token()
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const loadMessages = () => (dispatch: any): void => {
  axios
    .get('/api/message/last10', config)
    .then((res) => {
      console.log(res)
      dispatch({
        type: MESSAGE_SUCCESS,
        payload: res.data
      })
    })
    .catch((err) => console.log(err))
}
