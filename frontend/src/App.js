import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calc from './pages/Calc';
import Display from './pages/Display';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Analysis from './pages/Analysis';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/calculation' element={<ProtectedRoute element={Display} />} />
        <Route path='/main' element={<ProtectedRoute element={Calc} />} />
        <Route path='/estimate' element={<ProtectedRoute element={Analysis} />} />
      </Routes>
    </Layout>
  );
}

export default App;