// src/hooks/carousel/DeleteCarousel.js
import { useState } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useDeleteCarousel = () => {
  const [loading, setLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteCarousel = async (carouselId) => {
    setLoading(true);
    setDeleteSuccess(false);
    setDeleteError(null);

    try {
      const token = sessionStorage.getItem("token");
      const apiUrl = `${BASE_URL}/api/v1/home/carousel/delete/${carouselId}`;

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
      setDeleteError("An error occurred while deleting the carousel.");
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
    deleteCarousel,
    resetDeleteState,
  };
};

export default useDeleteCarousel;
