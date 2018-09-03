import mapKeys from 'lodash/mapKeys'
import { FETCH_COMBINATIONS, FETCH_COMBINATION } from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_COMBINATION:
            console.log('in reducers, fetching 1 combinations')
            const combination = action.payload
            return { ...state, [combination._id]: combination }
        case FETCH_COMBINATIONS:
            console.log('in reducers, fetching all combinations')
            return { ...state, ...mapKeys(action.payload, '_id') }
        default:
            return state
    }
}
