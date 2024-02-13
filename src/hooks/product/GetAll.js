// utils/api.js
import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getProductList = async (page = 1, pageSize = 10, search = "") => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/product/list?page=${page}&page_size=${pageSize}&search=${search}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    let errorMessage = "An error occurred";
    
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
      console.error("Backend error message:", error.response.data.message);
    } else if (error.request) {
      errorMessage = "No response received from the server";
    } else {
      errorMessage = "An error occurred while setting up the request";
    }

    throw new Error(errorMessage);
  }
};

export default getProductList;
