import axios from 'axios';

const BASE_URL = 'https://spotless-sombrero-hen.cyclic.app/payments';

// Función para crear un nuevo pago
export const createPayment = async (paymentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(BASE_URL, paymentData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Función para obtener detalles de un pago por ID
export const getPaymentById = async (paymentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get(`${BASE_URL}/${paymentId}`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Función para actualizar el estado de un pago por ID
export const updatePaymentStatus = async (paymentId, status, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.put(`${BASE_URL}/${paymentId}/status`, { status }, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Función para cancelar un pago por ID
export const cancelPayment = async (paymentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.put(`${BASE_URL}/${paymentId}/cancel`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Función para marcar un pago como completo por ID
export const completePayment = async (paymentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.put(`${BASE_URL}/${paymentId}/complete`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

