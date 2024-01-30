import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getLatestOrders = async (page = 1, pageSize = 10) => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found. Redirecting to login.');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/api/v1/home/latest-order?page=${page}&page_size=${pageSize}`, {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching latest orders:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default getLatestOrders;
