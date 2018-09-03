import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCombination } from '../../actions'

// This component is rendered when an individual combinations is clicked
// It will display the details of the entry
class CombinationShow extends Component {
    componentDidMount () {
        console.log("component mounts, fetchCombination")
        this.props.fetchCombination(this.props.match.params._id)
    }

    render () {
        console.log(this.props.combination)
        if (!this.props.combination) {
            return ''
        }

        const { title, proclivity } = this.props.combination

        return (
          <div>
              <h3>{title}</h3>
              <p>{proclivity}</p>
          </div>
        )
    }
}

// Gets props by invoking 'fetchCombination' dispatcher, gets 1 combinations
function mapStateToProps ({ combinations }, ownProps) {
    return { combination: combinations[ownProps.match.params._id] }
}

export default connect(mapStateToProps, { fetchCombination })(CombinationShow)
