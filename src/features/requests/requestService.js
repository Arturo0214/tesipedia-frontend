import axios from 'axios'

const API_URL = 'https://spotless-sombrero-hen.cyclic.app/'

const requestService = {
  createRequest: async (requestData, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${API_URL}requests`, requestData, config)
      return response.data
    } catch (error) {
      throw error
    }
  },

  cancelRequest: async (requestId, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${API_URL}requests/${requestId}/cancel`, null, config)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getRequest: async (requestId, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}requests/${requestId}`, config)
      return response.data
    } catch (error) {
      throw error
    }
  },

  updateRequest: async (requestId, requestData, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${API_URL}requests/${requestId}`, requestData, config)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default requestService