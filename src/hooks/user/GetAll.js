// src/hooks/user/GetAll.js
import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useUserData = (page = 1) => {
  const pageSize = 1;
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const apiUrl = `${BASE_URL}/api/v1/user/?page=${page}&page_size=${pageSize}`;

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
        setUserData(data.data);
        setTotalPages(data.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [page]);

  return { userData, loading, error, totalPages };
};

export default useUserData;
