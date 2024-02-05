import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const createProduct = async (productData) => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found. Redirecting to login.');
    }

    const response = await axios.post(`${BASE_URL}/api/v1/product/create`, productData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default createProduct;
