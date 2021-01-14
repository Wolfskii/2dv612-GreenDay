/* Redux store */
/* Den här håller egentligen hela applikations state tree med hjälp av Redux */
/* Filen är också av .js eftersom __REDUX_DEVTOOLS_EXTENSION__ inte har en typeof, så får det ej att funka med .ts */

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
)

export default store
