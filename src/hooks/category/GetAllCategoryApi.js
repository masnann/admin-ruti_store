// utils/api.js
import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getAllCategories = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/category/list`,
      {
        params: {
          page,
          page_size: pageSize,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        throw new Error('No response received from the server');
      } else {
        throw new Error('An error occurred while setting up the request');
      }
    } else {
      throw new Error('An error occurred: ' + error.message);
    }
  }
};

export default getAllCategories;
