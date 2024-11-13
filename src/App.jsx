

import './App.css'

import { Route, Routes } from 'react-router-dom'
import Project from './pages/Project'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Pagenotfound from './pages/Pagenotfound'
import Footer from './components/Footer'
import Header from './components/Header'
import { useContext } from 'react'
import { loginResponseContext } from './context/ContentShare'


function App() {
  const loginResponse =useContext(loginResponseContext)

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/project' element={loginResponse?<Project/>:<Pagenotfound/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register={true}/> }/>
      <Route path='/dashboard' element={loginResponse?<Dashboard/>:<Pagenotfound/>}/>
      <Route path='/*' element={<Pagenotfound/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
