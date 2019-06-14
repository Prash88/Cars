import axios from "axios"
import { CARS } from "./mockData"
import { AVAILABILITY, SORT_BY_NAME } from "../constants"
import i18n from "../config/i18n"

export function getCars(criteria, chunkIndex = 0) {
  // assume the following logic is done by backend
  let result = CARS.filter(car => {
    // verify make
    if (criteria.make && criteria.make !== car.make) {
      return false
    }
    // verify model
    if (criteria.model && criteria.model !== car.model) {
      return false
    }
    // verify year
    if (criteria.year && criteria.year !== car.year) {
      return false
    }
    return true
  })

  // sort
  if (criteria.sortBy === SORT_BY_NAME.AtoZ) {
    result = result.sort((a, b) => (a.name < b.name ? -1 : 1))
  } else if (criteria.sortBy === SORT_BY_NAME.ZtoA) {
    result = result.sort((a, b) => (a.name < b.name ? 1 : -1))
  } else if (criteria.sortBy === AVAILABILITY.IN_DEALERSHIP) {
    result = result.sort((a, b) => {
      if (a.availability === b.availability) {
        return 0
      } else if (a.availability === AVAILABILITY.IN_DEALERSHIP) {
        return -1
      } else if (a.availability === AVAILABILITY.UNAVILABLE) {
        return 1
      } else if (a.availability === AVAILABILITY.OUT_OF_STOCK) {
        return 1
      }
      return 0
    })
  }

  // return a chunk of cars
  const indexLow = 10 * chunkIndex
  const indexHigh = 10 * (chunkIndex + 1)
  return result.slice(indexLow, indexHigh) || []
}
