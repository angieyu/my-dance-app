import React from 'react'
import { Link } from 'react-router-dom'
import CombinationList from './combinations/CombinationList'

const Dashboard = () => {
    return (
      <div className="dashboard">
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
