import { TYPES } from "../actions/CarsActions"

const INITIAL_STATE = {
  cars: [],
  isLoadingCars: false,
  carsError: null,
  chunkIndex: 1,
  criteria: null
}

export default (state = INITIAL_STATE, action) => {
  //Use immutable 
  switch (action.type) {
    // get cars
    case TYPES.SEARCH_CARS:
      return { ...state, cars: [], isLoadingCars: true, criteria: action.criteria }
    case TYPES.SEARCH_CARS_SUCCESS:
      return { ...state, cars: state.cars.concat(action.cars), isLoadingCars: false }
    case TYPES.SEARCH_CARS_FAILURE:
      return { ...state, carsError: action.error }

    // get more cars
    case TYPES.GET_MORE_CARS:
      return { ...state }
    case TYPES.GET_MORE_CARS_SUCCESS:
      return { ...state, cars: state.cars.concat(action.cars), chunkIndex: state.chunkIndex + 1 }

    case TYPES.ADD_STARS:
      let cars = state.cars.map(e => {
        if (e.id === action.payload.id){
          e.stars = action.payload.stars;
        }
        return e;
    });
      return { ...state, cars: cars }

    default:
      return state
  }
}
