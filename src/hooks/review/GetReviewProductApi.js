// utils/api.js
import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getReviewsList = async (productId, page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/reviews/list/${productId}?page=${page}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};
export default getReviewsList;