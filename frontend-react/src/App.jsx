import { useState } from 'react'
import './App.scss'
import { BrowserRouter as Router, Routes, Route}from 'react-router-dom'
import Lander from './screens/Lander/Lander'

function App() {
  const [count, setCount] = useState(0)

  return <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Lander/>}/>
      </Routes>
    </Router>
  </div>
}

export default App
