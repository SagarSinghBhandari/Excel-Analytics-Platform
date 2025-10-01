import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UploadPage from './pages/UploadPage'
import ViewUpload from './pages/ViewUpload'

function App(){
  return (
    <BrowserRouter>
      <nav style={{padding:10}}>
        <Link to='/' style={{marginRight:10}}>Home</Link>
        <Link to='/upload' style={{marginRight:10}}>Upload</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/upload' element={<UploadPage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/upload/:id' element={<ViewUpload/>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
