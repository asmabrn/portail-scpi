
import React, { useState, useEffect } from 'react';
import SocieteCard from './SocieteCard';
import { getSocietes } from '../../services/societeService';
import './SocietesList.css';

const SocietesList = () => {
  const [societes, setSocietes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSocietes = async () => {
      try {
        const data = await getSocietes();
        setSocietes(data);
      } catch (error) {
        console.error('Erreur lors du chargement des sociétés:', error);
        setError('Erreur lors du chargement des sociétés');
      } finally {
        setLoading(false);
      }
    };

    fetchSocietes();
  }, []);

  if (loading) return <div className="loading">Chargement des sociétés...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="societes-container">
      <div className="container">
        <div className="section-header">
          <h1>Sociétés de gestion</h1>
          <p>Découvrez les sociétés de gestion immobilière </p>
        </div>
        
        <div className="societes-grid">
          {societes.map(societe => (
            <SocieteCard key={societe._id} societe={societe} />
          ))}
        </div>
        
        {societes.length === 0 && (
          <div className="empty-state">
            <p>Aucune société de gestion disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SocietesList;