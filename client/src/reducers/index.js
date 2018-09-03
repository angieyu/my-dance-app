import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import combinationsReducer from './combinationsReducer'

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    combinations: combinationsReducer
})
