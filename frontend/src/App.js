import React from 'react'
import logo from './logo.svg'
import './App.css'
import DataDisplay from './dataDisplay'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DataDisplay />
      </header>
    </div>
  )
}

export default App
