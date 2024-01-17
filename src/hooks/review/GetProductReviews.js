import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useProductReviews = (productId, page = 1) => {
  const pageSize = 10;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProductReviews = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const apiUrl = `${BASE_URL}/api/v1/reviews/list/${productId}?page=${page}&page_size=${pageSize}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorMessage = `Failed to fetch product reviews. HTTP error! Status: ${response.status}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        //console.log("Product Reviews Data:", data.data);
        setReviews(data.data);
        setTotalPages(data.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product reviews:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductReviews();
  }, [productId, page, pageSize]);

  return { reviews, loading, error, totalPages, itemsPerPage: pageSize };
};

export default useProductReviews;
