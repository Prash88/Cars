export const TYPES = {
  SEARCH_CARS: "SEARCH_CARS",
  SEARCH_CARS_SUCCESS: "SEARCH_CARS_SUCCESS",
  SEARCH_CARS_FAILURE: "SEARCH_CARS_FAILURE",

  GET_MORE_CARS: "GET_MORE_CARS",
  GET_MORE_CARS_SUCCESS: "GET_MORE_CARS_SUCCESS",

  ADD_STARS: "ADD_STARS",
}

export const ACTIONS = {
  searchCars: criteria => ({
    type: TYPES.SEARCH_CARS,
    criteria
  }),

  searchCarsSuccess: cars => ({
    type: TYPES.SEARCH_CARS_SUCCESS,
    cars
  }),

  searchCarsFailure: error => ({
    type: TYPES.SEARCH_CARS_FAILURE,
    error
  }),

  getMoreCars: () => ({
    type: TYPES.GET_MORE_CARS
  }),

  getMoreCarsSuccess: cars => ({
    type: TYPES.GET_MORE_CARS_SUCCESS,
    cars
  }),

  addStars: (id, stars) => ({
    type: TYPES.ADD_STARS,
    payload: { id: id, stars: stars }
  }),
}
