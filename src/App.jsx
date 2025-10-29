import React from 'react'
import './App.css'
import EarthquakeMap from './components/EarthquakeMap'

function App() {
  return (
    <div className="app-container">
      <h1>🌎 Earthquake Visualizer</h1>
      <p>Live earthquake data from USGS (past 24 hours)</p>
      <EarthquakeMap />
    </div>
  )
}

export default App
