import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found. Redirecting to login.');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      id: orderId,
      order_status: newStatus,
    };

    const response = await axios.put(`${BASE_URL}/api/v1/order/update-status`, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default updateOrderStatus;
