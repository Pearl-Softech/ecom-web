import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Search from './pages/Search'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
      <NavBar />
      <main>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App