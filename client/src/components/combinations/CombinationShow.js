import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { fetchCombination, selectCombination, deselectCombination } from '../../actions'
import * as actions from '../../actions'
import _ from 'lodash'

// This component is rendered when an individual combinations is clicked
// It will display the details of the entry
class CombinationShow extends Component {
    componentDidMount () {
        this.props.fetchCombination(this.props.match.params._id)
    }

    handleCombinationFocus ({ _id }, event) {
        console.log('id is ' + _id)
        const { selectCombination, deselectCombination } = this.props
        event.target.checked ? selectCombination(_id) : deselectCombination(_id)
    }

    render () {
        if (!this.props.combination) {
            return ''
        }

        const { _id, title, proclivity, focus } = this.props.combination

        return (
          <div>
              <h3>{title}</h3>
              <p>{proclivity}</p>
              <p>{focus}</p>
              <input
                style={{ marginBottom: '5px' }}
                type="checkbox"
                checked={_.includes(this.props.selectedCombinationIds, _id)}
                className="filled-in"
                id={title}
                onChange={this.handleCombinationFocus.bind(this, this.props.combination)}
              />
              <label htmlFor={title}>Focus</label>
          </div>
        )
    }
}

// Gets props by invoking 'fetchCombination' dispatcher, gets 1 combinations
function mapStateToProps ({ combinations, selectedCombinationIds }, ownProps) {
    return { combination: combinations[ownProps.match.params._id], selectedCombinationIds }
}

export default connect(mapStateToProps, actions)(CombinationShow)
