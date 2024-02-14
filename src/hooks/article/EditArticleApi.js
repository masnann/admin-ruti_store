import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const updateArticle = async (articleId, articleData) => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found. Redirecting to login.');
    }

    const formData = new FormData();
    formData.append('title', articleData.title);
    formData.append('photo', articleData.photo);
    formData.append('content', articleData.content);

    const response = await axios.put(`${BASE_URL}/api/v1/article/update/${articleId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'multipart/form-data', 
      },
    });

    return response.data.data; 
  } catch (error) {
    console.error('Error updating article:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default updateArticle;
