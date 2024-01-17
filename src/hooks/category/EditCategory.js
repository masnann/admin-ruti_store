import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useEditCategory = (categoryId) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFileChange = (field, file) => {
    setFormData({
      ...formData,
      [field]: file,
    });
  };

  const editCategory = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");
      const apiUrl = `${BASE_URL}/api/v1/category/update/${categoryId}`;

      const formDataApi = new FormData();
      formDataApi.append("name", formData.name);
      formDataApi.append("description", formData.description);

      if (formData.photo) {
        formDataApi.append("photo", formData.photo);
      }

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataApi,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setSuccess(true);
    } catch (error) {
      setError("An error occurred while updating the category.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      photo: null,
    });
    setSuccess(false);
    setError(null);
  };

  return {
    formData,
    loading,
    error,
    success,
    handleChange,
    handleFileChange,
    editCategory,
    resetForm,
  };
};

export default useEditCategory;
