import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Signup from './Pages/Signup';
import Signin from './Pages/Sigin';
import Dashboard from './Pages/Dashboard';
import Send from './Pages/Send';


function App(){
  return <div>
    <h1>Hi</h1>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Signup />}/>
      <Route path='/signin' element={<Signin />}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/send" element={<Send />} />
    </Routes>
    </BrowserRouter>
  </div>
}

export default App;