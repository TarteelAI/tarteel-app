import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"

import reducer from "./reducers"

const initialState = {}

const logger = createLogger({
  collapsed: true,
});

export default (initialState = initialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunk, logger))
}
