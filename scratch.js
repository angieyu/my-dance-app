import mapKeys from 'lodash/mapKeys'
import { FETCH_COMBINATIONS, FETCH_COMBINATION, SELECT_COMBINATION, DESELECT_COMBINATION } from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_COMBINATION:
            const combination = action.payload
            return { ...state, [combination._id]: combination }
        case FETCH_COMBINATIONS:
            return { ...state, ...mapKeys(action.payload, '_id') }
        case SELECT_COMBINATION:
            return { ...state, [combination._id]: combination }
        case DESELECT_COMBINATION:
            return { ...state, ...mapKeys(action.payload, '_id') }
        default:
            return state
    }
}
