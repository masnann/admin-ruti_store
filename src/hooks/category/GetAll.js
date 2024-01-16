import { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/ApiConfig';

const useCategoryData = (page = 1, pageSize = 10) => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const apiUrl = `${BASE_URL}/api/v1/category/list?page=${page}&page_size=${pageSize}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCategoryData(data.data);
        setTotalPages(data.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [page, pageSize]);

  return { categoryData, loading, error, totalPages };
};

export default useCategoryData;
