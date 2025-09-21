import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SocieteManager from './SocieteManager';
import ScpiManager from './ScpiManager';
import { checkAuth } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/admin/login');
          return;
        }

        const isAuth = await checkAuth();
        setIsAuthenticated(isAuth);
        if (!isAuth) {
          localStorage.removeItem('token');
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Erreur de vérification d\'authentification:', error);
        localStorage.removeItem('token');
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="loading">Vérification de l'authentification...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Administration</h2>
        <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
      </div>

      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList>
          <Tab>Sociétés de gestion</Tab>
          <Tab>SCPI</Tab>
        </TabList>

        <TabPanel>
          <SocieteManager />
        </TabPanel>
        <TabPanel>
          <ScpiManager />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;