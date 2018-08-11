import { combineReducers } from "redux"

import records from "./records"
import ayahs from "./ayahs"
import demographicData from "./demographicData"

export default combineReducers({
  records,
  ayahs,
  demographicData
})
