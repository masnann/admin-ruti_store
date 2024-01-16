// src/hooks/product/Product.js

import { useState, useEffect } from "react";
import { BASE_URL } from '../../utils/ApiConfig';

const useProductData = (page = 1) => {
  const pageSize = 2; 
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const apiUrl = `${BASE_URL}/api/v1/product/list/?page=${page}&page_size=${pageSize}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProductData(data.data);
        setTotalPages(data.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [page]);

  return { productData, loading, error, totalPages };
};

export default useProductData;
