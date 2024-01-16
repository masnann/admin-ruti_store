// src/hooks/payment/Payment.js

import { useState, useEffect } from "react";
import { BASE_URL } from '../../utils/ApiConfig';

const useOrderData = (page = 1) => {
  const pageSize = 2; 
  const [orderData, setOrdertData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const apiUrl = `${BASE_URL}/api/v1/order/list?page=${page}&page_size=${pageSize}`;

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
        setOrdertData(data.data);
        setTotalPages(data.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [page]);

  return { orderData, loading, error, totalPages };
};

export default useOrderData;
