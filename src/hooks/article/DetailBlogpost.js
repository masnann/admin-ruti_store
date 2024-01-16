// src/hooks/article/DetailBlogpost.js
import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useArticleDetails = (articleId) => {
  const [articleDetails, setArticleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const apiUrl = `${BASE_URL}/api/v1/article/details/${articleId}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setArticleDetails(responseData.data);
      } catch (error) {
        setError("An error occurred while fetching article details.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [articleId]);

  return { articleDetails, loading, error };
};

export default useArticleDetails;
