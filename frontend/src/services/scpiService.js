import api from './api';

export const getScpis = async () => {
  try {
    const response = await api.get('/scpis');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des SCPI:', error);
    throw error.response?.data || { message: 'Erreur de connexion' };
  }
};

export const createScpi = async (scpiData) => {
  try {
    const response = await api.post('/scpis', scpiData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la SCPI:', error);
    throw error.response?.data || { message: 'Erreur lors de la création' };
  }
};

export const updateScpi = async (id, scpiData) => {
  try {
    const response = await api.put(`/scpis/${id}`, scpiData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la SCPI:', error);
    throw error.response?.data || { message: 'Erreur lors de la mise à jour' };
  }
};

export const deleteScpi = async (id) => {
  try {
    const response = await api.delete(`/scpis/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la SCPI:', error);
    throw error.response?.data || { message: 'Erreur lors de la suppression' };
  }
};