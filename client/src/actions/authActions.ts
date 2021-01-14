/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { returnErrors, clearErrors } from './errorActions'

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types'

export const tokenConfig = (getState: any): any => {
  /* Get token */
  const token: string = getState().auth.token // looks for token in authReducer state

  /* Headers */
  const config: any = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  /* Token exists, create header x-auth-token with token as value */
  if (token !== null && token !== undefined) {
    config.headers['x-auth-token'] = token
  }

  return config
}

/* Check token and load user */
export const loadUser = () => (dispatch: any, getState: any | null): void => {
  /* Change loading user to true */
  dispatch({
    type: USER_LOADING // loads USER_LOADING in authReducer
  })

  /* Fetch user credentials (all the time), this is not for logging in, this is for keeping the user logged in */
  axios
    .get('/api/user', tokenConfig(getState))
    .then((res) => {
      console.log(res)
      dispatch({
        type: USER_LOADED, // authReduceer
        payload: res.data // an object with the user itself
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR // authReduceer
      })
    })
}

export const login = ({
  username,
  password
}: {
  username: string
  password: string
}) => (dispatch: any): any => {
  const config: any = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  const body: any = { username, password }
  /* Make request */
  axios
    .post('/api/login', body, config)
    .then((res) => {
      dispatch(clearErrors())
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data // authReducer
      })
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      ) // handles errors (errorActions who uses errorReducer)
      dispatch({
        type: LOGIN_FAIL // authReducer
      })
    })
}

/* Register customer */
export const registerCustomer = ({
  firstname,
  lastname,
  phone,
  username,
  email,
  password
}: {
  firstname: any
  lastname: any
  phone: any
  username: any
  email: any
  password: any
}) => (dispatch: any): any => {
  const config: any = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  /* Request data body */
  const body: string = JSON.stringify({
    firstname,
    lastname,
    phone,
    username,
    email,
    password
  })

  /* Make request */
  axios
    .post('/api/register/customer', body, config)
    .then((res) => {
      dispatch(clearErrors())
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data // authReducer
      })
    })
    .catch((err) => {
      // if something goes wrong
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      ) // handles errors (errorActions who uses errorReducer)
      dispatch({
        type: REGISTER_FAIL // authReducer
      })
    })
}

/* Logout user */
export const logout = (): any => {
  return {
    type: LOGOUT_SUCCESS
  }
}
