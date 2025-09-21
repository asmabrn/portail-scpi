import React, { useState, useEffect } from 'react';
import { getScpis, createScpi, updateScpi, deleteScpi } from '../../services/scpiService';
import { getSocietes } from '../../services/societeService';
import './ScpiManager.css';

const ScpiManager = () => {
  const [scpis, setScpis] = useState([]);
  const [societes, setSocietes] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    societe: '',
    prixPart: '',
    rendement: '',
    capitalisation: '',
    type: 'diversifié',
    description: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadScpis();
    loadSocietes();
  }, []);

  const loadScpis = async () => {
    try {
      const data = await getScpis();
      setScpis(data);
      setError('');
    } catch (error) {
      setError(error.message || 'Erreur lors du chargement des SCPI');
    }
  };

  const loadSocietes = async () => {
    try {
      const data = await getSocietes();
      setSocietes(data);
    } catch (error) {
      console.error('Erreur lors du chargement des sociétés:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const dataToSend = {
        ...formData,
        prixPart: parseFloat(formData.prixPart),
        rendement: parseFloat(formData.rendement),
        capitalisation: parseFloat(formData.capitalisation)
      };

      if (editingId) {
        await updateScpi(editingId, dataToSend);
        setSuccess('SCPI modifiée avec succès');
        setEditingId(null);
      } else {
        await createScpi(dataToSend);
        setSuccess('SCPI créée avec succès');
      }

      setFormData({
        nom: '',
        societe: '',
        prixPart: '',
        rendement: '',
        capitalisation: '',
        type: 'diversifié',
        description: '',
        image: ''
      });

      await loadScpis();
    } catch (error) {
      console.error('Erreur détaillée:', error);
      setError(error.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (scpi) => {
    setFormData({
      nom: scpi.nom,
      societe: scpi.societe ? scpi.societe._id : '', // Vérification ajoutée ici
      prixPart: scpi.prixPart.toString(),
      rendement: scpi.rendement.toString(),
      capitalisation: scpi.capitalisation.toString(),
      type: scpi.type,
      description: scpi.description,
      image: scpi.image || ''
    });
    setEditingId(scpi._id);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette SCPI ?')) {
      try {
        await deleteScpi(id);
        setSuccess('SCPI supprimée avec succès');
        await loadScpis();
      } catch (error) {
        setError(error.message || 'Erreur lors de la suppression');
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      nom: '',
      societe: '',
      prixPart: '',
      rendement: '',
      capitalisation: '',
      type: 'diversifié',
      description: '',
      image: ''
    });
    setError('');
    setSuccess('');
  };

  return (
    <div className="scpi-manager">
      <h3>Gestion des SCPI</h3>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="scpi-form">
        <input
          type="text"
          placeholder="Nom"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          required
          disabled={loading}
        />

        <select
          value={formData.societe}
          onChange={(e) => setFormData({ ...formData, societe: e.target.value })}
          required
          disabled={loading}
        >
          <option value="">Sélectionner une société</option>
          {societes.map(societe => (
            <option key={societe._id} value={societe._id}>{societe.nom}</option>
          ))}
        </select>

        <input
          type="number"
          step="0.01"
          placeholder="Prix part"
          value={formData.prixPart}
          onChange={(e) => setFormData({ ...formData, prixPart: e.target.value })}
          required
          disabled={loading}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Rendement (%)"
          value={formData.rendement}
          onChange={(e) => setFormData({ ...formData, rendement: e.target.value })}
          required
          disabled={loading}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Capitalisation (M€)"
          value={formData.capitalisation}
          onChange={(e) => setFormData({ ...formData, capitalisation: e.target.value })}
          required
          disabled={loading}
        />

        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
          disabled={loading}
        >
          <option value="diversifié">Diversifié</option>
          <option value="bureau">Bureau</option>
          <option value="commerce">Commerce</option>
          <option value="santé">Santé</option>
          <option value="logistique">Logistique</option>
        </select>

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          disabled={loading}
        />

        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? 'Traitement...' : (editingId ? 'Modifier' : 'Ajouter')}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} disabled={loading}>
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="scpis-list">
        {scpis.map(scpi => (
          <div key={scpi._id} className="scpi-item">
            <div className="scpi-info">
              <h4>{scpi.nom}</h4>
              {/* Correction ici : vérification de scpi.societe avant d'accéder à .nom */}
              <p><strong>Société:</strong> {scpi.societe ? scpi.societe.nom : 'Société inconnue'}</p>
              <p><strong>Prix part:</strong> {scpi.prixPart} €</p>
              <p><strong>Rendement:</strong> {scpi.rendement}%</p>
              <p><strong>Capitalisation:</strong> {scpi.capitalisation} M€</p>
              <p><strong>Type:</strong> {scpi.type}</p>
              <p>{scpi.description}</p>
            </div>
            <div className="scpi-actions">
              <button
                className="btn-edit"
                onClick={() => handleEdit(scpi)}
                disabled={loading}
              >
                Modifier
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(scpi._id)}
                disabled={loading}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScpiManager;