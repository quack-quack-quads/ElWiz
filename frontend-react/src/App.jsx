import { useState } from 'react'
import './App.scss'
import { BrowserRouter as Router, Routes, Route}from 'react-router-dom'

import Lander from './screens/Lander/Lander'
import Login from './screens/Login/Login'
import Signup from './screens/Signup/Signup'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return <div className="App">
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Lander/>}/>
      </Routes>
      <Footer/>
    </Router>
  </div>
}

export default App
