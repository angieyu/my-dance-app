import { createSelector } from 'reselect'
import _ from 'lodash'
// Reselct selector picks out the selected combinations

console.log('hi')
// Create select functions to pick the piece of state that we care about
const combinationsSelector = (state) => {console.log(state.combination)}
const selectedCombinationSelector = (state) => {console.log(state.selectedCombinationIds)}

// filter to get only the combinations that are in the selectedCombinationIds
const getPosts = (combinations, selectedCombinationIds) => {
    return _.filter(
      combinations,
      combination => _.includes(selectedCombinationIds, combination.id))
}

export default createSelector(
  combinationsSelector, // pick off a piece of state
  selectedCombinationSelector, // pick off a piece of state
  getPosts // last argument is the function that has our select logic
)