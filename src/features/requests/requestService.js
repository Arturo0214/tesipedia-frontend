import axios from 'axios';

const API_URL = 'https://spotless-sombrero-hen.cyclic.app/requests';

export const createRequest = async (requestData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(API_URL, requestData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const cancelRequest = async (requestId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(`${API_URL}/${requestId}/cancel`, {}, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getRequest = async (requestId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/${requestId}`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateRequest = async (requestId, requestData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.put(`${API_URL}/${requestId}`, requestData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}