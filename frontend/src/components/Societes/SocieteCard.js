
import React from 'react';
import './SocieteCard.css';

const SocieteCard = ({ societe }) => {
  return (
    <div className="societe-card">
      <div className="societe-card-header">
        {societe.logo ? (
          <img src={societe.logo} alt={societe.nom} className="societe-logo" />
        ) : (
          <div className="societe-logo-placeholder">
            {societe.nom.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <div className="societe-card-body">
        <h3 className="societe-name">{societe.nom}</h3>
        <p className="societe-description">{societe.description}</p>
      </div>
      
      
    </div>
  );
};

export default SocieteCard;