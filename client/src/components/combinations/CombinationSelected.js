import React from 'react'
import { connect } from 'react-redux'
import SelectedCombinationSelector from '../../selectors/focused_combinations'

const SelectedCombinationsList = (props) => {
    console.log(props.combinations)
    return (
      <ul className="list-group">
          {props.combinations.map(combination => {
              return <li className="list-group-item" key={combination.id}>{combination.title}</li>
          })}
      </ul>
    )
}

const mapStateToProps = state => {
    return {
        combinations: SelectedCombinationSelector(state)
    }
}

export default connect(mapStateToProps)(SelectedCombinationsList)