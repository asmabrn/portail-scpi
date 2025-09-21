
import React from 'react';
import './ScpiCard.css';

const ScpiCard = ({ scpi }) => {
 
  if (!scpi) {
    return <div>Données de SCPI non disponibles</div>;
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <div className="scpi-card">
      <div className="scpi-card-header">
        {scpi.image ? (
          <img src={scpi.image} alt={scpi.nom} className="scpi-image" />
        ) : (
          <div className="scpi-image-placeholder">
            {scpi.nom.charAt(0).toUpperCase()}
          </div>
        )}
        
        <div className="scpi-type-badge">{scpi.type}</div>
      </div>
      
      <div className="scpi-card-body">
        <h3 className="scpi-name">{scpi.nom}</h3>
        <p className="scpi-societe">
          {scpi.societe ? scpi.societe.nom : 'Société inconnue'}
        </p>
        
        <div className="scpi-stats">
          <div className="stat-item">
            <span className="stat-label">Prix part</span>
            <span className="stat-value">{formatNumber(scpi.prixPart)} €</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-label">Rendement</span>
            <span className="stat-value highlight">{scpi.rendement}%</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-label">Capitalisation</span>
            <span className="stat-value">{formatNumber(scpi.capitalisation)} M€</span>
          </div>
        </div>
        
        <p className="scpi-description">{scpi.description}</p>
      </div>
    </div>
  );
};

export default ScpiCard;