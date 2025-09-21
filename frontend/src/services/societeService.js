import api from './api';

export const getSocietes = async () => {
  const response = await api.get('/societes');
  return response.data;
};

export const createSociete = async (societeData) => {
  const response = await api.post('/societes', societeData);
  return response.data;
};

export const updateSociete = async (id, societeData) => {
  const response = await api.put(`/societes/${id}`, societeData);
  return response.data;
};

export const deleteSociete = async (id) => {
  const response = await api.delete(`/societes/${id}`);
  return response.data;
};