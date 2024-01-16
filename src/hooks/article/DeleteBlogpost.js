// hooks/article/DeleteBlogpost.js
import { useState, useCallback } from 'react';
import { BASE_URL } from '../../utils/ApiConfig';

const useDeleteArticle = () => {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteArticle = async (articleId) => {
    try {
      const token = sessionStorage.getItem('token');
      const apiUrl = `${BASE_URL}/api/v1/article/delete/${articleId}`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setDeleteSuccess(true);
    } catch (error) {
      setDeleteError(error.message);
    }
  };

  // Reset function to be used after handling the delete result
  const resetDeleteState = useCallback(() => {
    setDeleteSuccess(false);
    setDeleteError(null);
  }, []);

  return {
    deleteArticle,
    deleteSuccess,
    deleteError,
    resetDeleteState,
  };
};

export default useDeleteArticle;
