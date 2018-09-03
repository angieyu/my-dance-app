import React from 'react'
import { Link } from 'react-router-dom'
import CombinationList from './combinations/CombinationList'
import CombinationSelected from './combinations/CombinationSelected'

const Dashboard = () => {
    return (
      <div>
          <CombinationSelected/>
          <CombinationList/>
          <div className="fixed-action-btn">
              <Link to="/combinations/new" className="btn-floating btn-large red">
                  <i className="material-icons">add</i>
              </Link>
          </div>
      </div>
    )
}

export default Dashboard
