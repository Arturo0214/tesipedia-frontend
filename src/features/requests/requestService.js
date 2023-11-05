import axios from 'axios';

const API_URL = 'http://localhost:8000/requests';

export const createRequest = async (requestData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
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

export const deleteRequest = async (requestId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(`${API_URL}/${requestId}/delete`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

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
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.put(`${API_URL}/${requestId}`, requestData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

export const updateFile = async (requestId, fileData, token) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.put(`${API_URL}/${requestId}/updateFile`, fileData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

export const getAllRequests = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/all`, config);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todas las requests:', error);
    throw error;
  }
};