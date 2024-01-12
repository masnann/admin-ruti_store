import { useState, useEffect } from 'react';

const usePaymentData = (page = 1, pageSize = 10) => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const apiUrl = `https://backend-rutistore-f3d3cba4863c.herokuapp.com/api/v1/order/payment/?page=1&page_size=8`;

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response headers:', response.headers);
        setPaymentData(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [page, pageSize]);

  return { paymentData, loading, error };
};

export default usePaymentData;
