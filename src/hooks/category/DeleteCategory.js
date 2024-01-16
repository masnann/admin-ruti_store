// src/hooks/category/DeleteCategory.js
import { useState } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteCategory = async (categoryId) => {
    setLoading(true);
    setDeleteSuccess(false);
    setDeleteError(null);

    try {
      const token = sessionStorage.getItem("token");
      const apiUrl = `${BASE_URL}/api/v1/category/delete/${categoryId}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setDeleteSuccess(true);
    } catch (error) {
      setDeleteError("An error occurred while deleting the category.");
    } finally {
      setLoading(false);
    }
  };

  const resetDeleteState = () => {
    setDeleteSuccess(false);
    setDeleteError(null);
  };

  return {
    loading,
    deleteSuccess,
    deleteError,
    deleteCategory,
    resetDeleteState,
  };
};

export default useDeleteCategory;
