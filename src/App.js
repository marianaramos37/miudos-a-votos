import './index.css';

import React from 'react';
import Answers from './pages/Answers';
import Login from './pages/Login';
import Form from './pages/Form'

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from './components/protectedRoute.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<Answers />} path="/respostas" />
          </Route>
          <Route element={<Form />} path="/" exact />
          <Route element={<Login />} path="/login" />
        </Routes>
      </Router>
    </div>
  )
}

export default App;