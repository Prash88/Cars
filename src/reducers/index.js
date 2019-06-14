import { combineReducers } from "redux"
import CarsReducer from "./CarsReducer"

export default combineReducers({
  Cars: CarsReducer
})
