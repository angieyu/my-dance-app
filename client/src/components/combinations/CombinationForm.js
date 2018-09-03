// CombinationForm shows a form for a user to add input
import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import CombinationField from './CombinationField'
import CombinationCheckbox from './CombinationCheckbox'
import formFields from './formFields'

class CombinationForm extends Component {
    renderFields () {
        return _.map(formFields, ({ label, name }) => {
            if (name === 'focus') {
                return (
                  <Field
                    name={name}
                    label={label}
                    component={CombinationCheckbox}
                  />
                )
            }
            else {
                return (
                  <Field
                    key={name}
                    component={CombinationField}
                    type="text"
                    label={label}
                    name={name}
                  />
                )
            }
        })

    }

    render () {
        console.log('HERE 2')
        return (
          <div>
              <form onSubmit={this.props.handleSubmit(this.props.onCombinationSubmit)}>
                  {this.renderFields()}
                  <Link to="/combinations" className="red btn-flat white-text">
                      Cancel
                  </Link>
                  <button type="submit" className="teal btn-flat right white-text">
                      Next
                      <i className="material-icons right">done</i>
                  </button>
              </form>
          </div>
        )
    }
}

function validate (values) {
    const errors = {}

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value'
        }
    })

    return errors
}

export default reduxForm({
    validate,
    form: 'combinationForm',
    destroyOnUnmount: false
})(CombinationForm)
