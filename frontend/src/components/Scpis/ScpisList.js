
import React, { useState, useEffect } from 'react';
import ScpiCard from './ScpiCard';
import ScpiFilter from './ScpiFilter';
import { getScpis } from '../../services/scpiService';
import { getSocietes } from '../../services/societeService';
import './ScpisList.css';

const ScpisList = () => {
  const [scpis, setScpis] = useState([]);
  const [societes, setSocietes] = useState([]);
  const [filteredScpis, setFilteredScpis] = useState([]);
  const [filters, setFilters] = useState({
    societe: '',
    type: '',
    minRendement: '',
    maxRendement: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scpiData, societeData] = await Promise.all([
          getScpis(),
          getSocietes()
        ]);
        
        setScpis(scpiData);
        setFilteredScpis(scpiData);
        setSocietes(societeData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = scpis;

    if (filters.societe) {
      result = result.filter(scpi => scpi.societe._id === filters.societe);
    }

    if (filters.type) {
      result = result.filter(scpi => scpi.type === filters.type);
    }

    if (filters.minRendement) {
      result = result.filter(scpi => scpi.rendement >= parseFloat(filters.minRendement));
    }

    if (filters.maxRendement) {
      result = result.filter(scpi => scpi.rendement <= parseFloat(filters.maxRendement));
    }

    setFilteredScpis(result);
  }, [filters, scpis]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <div className="loading">Chargement des SCPI...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="scpis-container">
      <div className="container">
        <div className="section-header">
          <h1>Selection de SCPI</h1>
          <p>Découvrez notre sélection de SCPI </p>
        </div>
        
        <ScpiFilter 
          societes={societes} 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        
        <div className="scpis-grid">
          {filteredScpis.map(scpi => (
            <ScpiCard key={scpi._id} scpi={scpi} />
          ))}
        </div>
        
        {filteredScpis.length === 0 && (
          <div className="empty-state">
            <p>Aucune SCPI ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScpisList;