import {} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import HomeController from './pages/Home'

function App() {
  

  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path = '/' element ={<Welcome/>} />
      <Route path = '/login' element ={<Login/>} />
      <Route path = '/register' element ={<Register/>} />
      <Route path = '/Home' element ={<Home/>} />
      <Route path = '/Homec' element ={<HomeController/>} />
    </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
