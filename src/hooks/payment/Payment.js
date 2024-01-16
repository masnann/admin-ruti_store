// src/hooks/payment/Payment.js

import { useState, useEffect } from "react";
import { BASE_URL } from '../../utils/ApiConfig';

const usePaymentData = (page = 1) => {
  const pageSize = 2; 
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const apiUrl = `${BASE_URL}/api/v1/order/payment/list?page=${page}&page_size=${pageSize}`;

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
        setPaymentData(data.data);
        setTotalPages(data.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [page]);

  return { paymentData, loading, error, totalPages };
};

export default usePaymentData;
