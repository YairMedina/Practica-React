import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ShowProducts from './components/ShowProducts'
import Vehicles from './components/Vehicles'
import Clients from './components/Clients'
import Models from './components/Models'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowProducts />} />
        <Route path="/vehicle" element={<Vehicles />} />
        <Route path="/client" element={<Clients />} />
        <Route path="/model" element={<Models />} />
      </Routes>
    </Router>
  )
}



export default App

