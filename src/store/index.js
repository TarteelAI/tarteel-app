import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

import reducer from "./reducers"

const initialState = {}

export default (initialState = initialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunk, logger))
}