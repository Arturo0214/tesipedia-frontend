import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './dashboard.css'

const Dashboard = () => {
  return (
    <>
    <header>
      <Navbar />
    </header>
    <main>
      <div className="container">
        <div className="dashboard-content">
          <div className="columns is-mobile">
            <div className="column">
              First column
            </div>
            <div className="column">
            Second column
            </div>
            <div className="column">
              Third column
            </div>
            <div className="column">
              Fourth column
            </div>
            </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default Dashboard
