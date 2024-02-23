import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const createProductVariant = async (variantData) => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found. Redirecting to login.');
    }

    const response = await axios.post(`${BASE_URL}/api/v1/product/create/variant`, variantData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data.data; 
  } catch (error) {
    console.error('Error creating product variant:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default createProductVariant;
