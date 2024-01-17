import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useCarouselData = (page = 1) => {
    const pageSize = 10;
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const apiUrl = `${BASE_URL}/api/v1/home/carousel/list?page=${page}&page_size=${pageSize}`;
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
        setCarouselData(data.data);
        setTotalPages(data.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, [page, pageSize]);

  return { carouselData, loading, error, totalPages , itemsPerPage: pageSize};
};

export default useCarouselData;
