import mapKeys from 'lodash/mapKeys'
import _ from 'lodash'

import { FETCH_COMBINATIONS, FETCH_COMBINATION, SELECT_COMBINATION, DESELECT_COMBINATION } from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_COMBINATION:
            const combination = action.payload
            return { ...state, [combination._id]: combination }
        case FETCH_COMBINATIONS:
            return { ...state, ...mapKeys(action.payload, '_id') }
        case SELECT_COMBINATION:
            console.log('in reducers, SELECT_COMBINATION')
            console.log(...state)
            console.log(action.payload)
            return [...state, action.payload]
        case DESELECT_COMBINATION:
            console.log('in reducers, DESELECT_COMBINATION')
            return _.without(state, action.payload)
        default:
            return state
    }
}
