import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkAuth = async () => {
  try {
   
    await api.get('/societes');
    return true;
  } catch (error) {
    return false;
  }
};