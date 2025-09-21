
import React from 'react';
import './ScpiFilter.css';

const ScpiFilter = ({ societes, filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  const handleReset = () => {
    onFilterChange({
      societe: '',
      type: '',
      minRendement: '',
      maxRendement: ''
    });
  };

  return (
    <div className="scpi-filter">
      <h3 className="filter-title">Filtrer les SCPI</h3>
      
      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="societe">Société de gestion</label>
          <select name="societe" id="societe" value={filters.societe} onChange={handleChange}>
            <option value="">Toutes les sociétés</option>
            {societes.map(societe => (
              <option key={societe._id} value={societe._id}>{societe.nom}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="type">Type de SCPI</label>
          <select name="type" id="type" value={filters.type} onChange={handleChange}>
            <option value="">Tous les types</option>
            <option value="diversifié">Diversifié</option>
            <option value="bureau">Bureau</option>
            <option value="commerce">Commerce</option>
            <option value="santé">Santé</option>
            <option value="logistique">Logistique</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="minRendement">Rendement min (%)</label>
          <input
            type="number"
            name="minRendement"
            id="minRendement"
            placeholder="0"
            value={filters.minRendement}
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxRendement">Rendement max (%)</label>
          <input
            type="number"
            name="maxRendement"
            id="maxRendement"
            placeholder="10"
            value={filters.maxRendement}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="filter-actions">
        <button type="button" className="btn-reset" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default ScpiFilter;