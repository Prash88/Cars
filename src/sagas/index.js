import { put, takeLatest, select, all } from "redux-saga/effects"
import { TYPES, ACTIONS } from "../actions/CarsActions"
import { getCars } from "../api"

function* searchCars({ criteria }) {
  try {
    const cars = getCars(criteria)
    yield put(ACTIONS.searchCarsSuccess(cars))
  } catch (e) {
    yield put(ACTIONS.searchCarsFailure(e.message))
  }
}

function* getMoreCars() {
  try {
    const { chunkIndex, criteria } = yield select(state => state.Cars)
    const cars = getCars(criteria, chunkIndex)
    yield put(ACTIONS.getMoreCarsSuccess(cars))
  } catch (e) {
    console.log("error in get more cars", e.message)
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(TYPES.SEARCH_CARS, searchCars),
    takeLatest(TYPES.GET_MORE_CARS, getMoreCars)
  ])
}
