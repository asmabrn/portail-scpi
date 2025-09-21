import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import SocietesList from './components/Societes/SocietesList';
import ScpisList from './components/Scpis/ScpisList';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import { getSocietes } from './services/societeService';
import './styles/App.css';

function App() {
  const [societes, setSocietes] = useState([]);

  useEffect(() => {
    const fetchSocietes = async () => {
      try {
        const data = await getSocietes();
        setSocietes(data);
      } catch (error) {
        console.error('Erreur lors du chargement des sociétés:', error);
      }
    };

    fetchSocietes();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <SocietesList societes={societes} />
                <ScpisList societes={societes} />
              </>
            } />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;