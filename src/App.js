import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn/SignIn';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./index.css";
import Transactions from './Pages/Home/Transactions';
import TokenExpirationTimer from './Pages/TokenExpirationTimer/TokenExpirationTimer';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<TokenExpirationTimer/>} />
        <Route path="/dashboard" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
          <Route path="/transactions" element={<Transactions/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
