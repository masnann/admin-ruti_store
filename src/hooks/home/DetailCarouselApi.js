import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getCarouselDetails = async (carouselId) => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found. Redirecting to login.');
    }

    const response = await axios.get(`${BASE_URL}/api/v1/home/carousel/details/${carouselId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data.data; 
  } catch (error) {
    console.error('Error fetching carousel details:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default getCarouselDetails;
