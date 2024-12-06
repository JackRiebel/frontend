import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PetProfiles from './pages/PetProfiles';
import Adoption from './pages/Adoption';
import MyServices from './pages/MyServices';
import Services from './pages/Services';
import Forum from './pages/Forum';
import Account from './pages/Account';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pet-profiles" element={<PetProfiles />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/my-services" element={<MyServices />} />
          <Route path="/services" element={<Services />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
