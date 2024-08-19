import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Calc from './pages/Calc'
import EmissionEstimate from './pages/EmissionEstimate'
import Display from './pages/Display'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/calculation' element={<Display />} />
        <Route path='/main' element={<Calc />} />
      </Routes>
    </Layout>

  );
}

export default App;
