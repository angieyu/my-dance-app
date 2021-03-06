// CombinationFormReview shows users their form inputs for review
import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import formFields from './formFields'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions'

class CombinationFormReview extends Component {
    renderFields () {
        const { formValues } = this.props

        return _.map(formFields, ({ name, label }) => {
            return (
              <div key={name}>
                  <label>{label}</label>
                  <div>{formValues[name]}</div>
              </div>
            )
        })
    }

    renderButtons () {
        const { onCancel } = this.props

        return (
          <div className="combination-form-buttons">
              <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
              >
                  Back
              </button>
              <button className="green btn-flat right white-text">
                  Save Combination
                  <i className="material-icons right">email</i>
              </button>
          </div>
        )
    }

    onSubmit (event) {
        event.preventDefault()

        const { submitCombination, history, formValues } = this.props

        submitCombination(formValues, history)
    }

    render () {
        return (
          <form onSubmit={this.onSubmit.bind(this)} className="combination-form-review">
              <h5>Please confirm your entries</h5>
              {this.renderFields()}

              {this.renderButtons()}
          </form>
        )
    }
}

function mapStateToProps (state) {
    return { formValues: state.form.combinationForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(CombinationFormReview))
