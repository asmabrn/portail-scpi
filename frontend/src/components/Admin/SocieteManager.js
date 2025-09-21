import React, { useState, useEffect } from 'react';
import { getSocietes, createSociete, updateSociete, deleteSociete } from '../../services/societeService';
import './SocieteManager.css';

const SocieteManager = () => {
  const [societes, setSocietes] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    logo: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSocietes();
  }, []);

  const loadSocietes = async () => {
    try {
      const data = await getSocietes();
      setSocietes(data);
    } catch (error) {
      setError('Erreur lors du chargement des sociétés');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSociete(editingId, formData);
        setEditingId(null);
      } else {
        await createSociete(formData);
      }
      setFormData({ nom: '', description: '', logo: '' });
      loadSocietes();
    } catch (error) {
      setError('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (societe) => {
    setFormData({
      nom: societe.nom,
      description: societe.description,
      logo: societe.logo
    });
    setEditingId(societe._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette société ?')) {
      try {
        await deleteSociete(id);
        loadSocietes();
      } catch (error) {
        setError('Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="societe-manager">
      <h3>Gestion des sociétés de gestion</h3>

      <form onSubmit={handleSubmit} className="societe-form">
        <input
          type="text"
          placeholder="Nom"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        
        <button type="submit">{editingId ? 'Modifier' : 'Ajouter'}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setFormData({ nom: '', description: '', logo: '' });
          }}>
            Annuler
          </button>
        )}
      </form>

      {error && <div className="error">{error}</div>}

      <div className="societes-list">
        {societes.map(societe => (
          <div key={societe._id} className="societe-item">
            <div>
              <h4>{societe.nom}</h4>
              <p>{societe.description}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(societe)}>Modifier</button>
              <button onClick={() => handleDelete(societe._id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocieteManager;