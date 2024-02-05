import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const updateProductPhoto = async (productId, formData) => {
    try {
      const token = sessionStorage.getItem('token');
  
      if (!token) {
        throw new Error('Token not found. Redirecting to login.');
      }
  
      const response = await axios.put(
        `${BASE_URL}/api/v1/product/photo/update/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      return response.data.data;
    } catch (error) {
      console.error('Error updating product photo:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        throw new Error('No response received from the server');
      } else {
        throw new Error('An error occurred while setting up the request');
      }
    }
  };
  
  export default updateProductPhoto;
