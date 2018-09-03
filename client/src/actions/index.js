import axios from 'axios'
import { FETCH_USER, FETCH_COMBINATIONS, FETCH_COMBINATION, SELECT_COMBINATION, DESELECT_COMBINATION } from './types'

// Dispatchers for the combinations page
// Submit 1 new combinations
export const submitCombination = (values, history) => async dispatch => {
    const res = await axios.post('/api/combinations', values)
    history.push('/combinations')
    dispatch({ type: FETCH_COMBINATION, payload: res.data })
}

// Gets a list of combinations to populate the CombinationList component
export const fetchCombinations = () => async dispatch => {
    const res = await axios.get('/api/combinations')
    dispatch({ type: FETCH_COMBINATIONS, payload: res.data })
}

export const fetchCombination = id => async dispatch => {
    const res = await axios.get(`/api/combinations/${id}`)
    dispatch({ type: FETCH_COMBINATION, payload: res.data })
}

export const selectCombination = id => async dispatch => {
    console.log('dispatchers in selectCombination ' + id)
    dispatch({ type: SELECT_COMBINATION, payload: id })
}

export const deselectCombination = id => async dispatch => {
    console.log('dispatchers in deselectCombination ' + id)
    dispatch({ type: DESELECT_COMBINATION, payload: id })
}

// Dispatchers for Auth stuff
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data })
}

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token)
    dispatch({ type: FETCH_USER, payload: res.data })
}

