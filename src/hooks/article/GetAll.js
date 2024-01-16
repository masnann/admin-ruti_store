// src/hooks/article/GetAll.js
import { useState, useEffect } from "react";
import { BASE_URL } from '../../utils/ApiConfig';

const useArticleData = (page = 1, pageSize = 10) => {
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const apiUrl = `${BASE_URL}/api/v1/article/list?page=${page}&page_size=${pageSize}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setArticleData(data.data);
        setTotalPages(data.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [page, pageSize]);

  return { articleData, loading, error, totalPages };
};

export default useArticleData;
