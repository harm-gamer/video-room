import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Landing from './Components/Landing'
import Room from './Components/Room'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
