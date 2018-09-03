import React, { Component } from 'react'
import map from 'lodash/map'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCombinations } from '../../actions'

class CombinationList extends Component {
    componentDidMount () {
        console.log("CombinationList mounts, run this.props.fetchCombinations()")
        this.props.fetchCombinations()
    }

    renderCombinations () {
        return map(this.props.combinations, combination => {
            return (
              <div className="card darken-1 horizontal" key={combination._id}>
                  <div className="card-stacked">
                      <div className="card-content">
                          <span className="card-title">{combination.title}</span>
                          <p>{combination.proclivity}</p>
                      </div>
                      <div className="card-action">
                          <Link to={`/combinations/${combination._id}`}>Read</Link>
                      </div>
                  </div>
              </div>
            )
        })
    }

    render () {
        return <div>{this.renderCombinations()}</div>
    }
}

// Gets props by invoking 'fetchCombinations' dispatcher, and gets all combinations

function mapStateToProps ({ combinations }) {
    return { combinations }
}

export default connect(mapStateToProps, { fetchCombinations })(CombinationList)
