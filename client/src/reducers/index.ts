import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import msgReducer from './msgReducer'

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  msg: msgReducer
})
