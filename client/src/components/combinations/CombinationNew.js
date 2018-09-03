// CombinationNew shows CombinationForm and CombinationFormReview
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import CombinationForm from './CombinationForm'
import CombinationFormReview from './CombinationFormReview'

class CombinationNew extends Component {
    state = { showFormReview: false }

    renderContent () {
        if (this.state.showFormReview) {
            return (
              <CombinationFormReview
                onCancel={() => this.setState({ showFormReview: false })}
              />
            )
        }

        return (
          <CombinationForm
            onCombinationSubmit={() => this.setState({ showFormReview: true })}
          />
        )
    }

    render () {
        console.log('HERE 3')
        return (
          <div>
              {this.renderContent()}
          </div>
        )
    }
}

export default reduxForm({
    form: 'combinationForm'
})(CombinationNew)
