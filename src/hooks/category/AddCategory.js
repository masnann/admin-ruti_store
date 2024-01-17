import { useState } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useAddCategory = () => {
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

  const addCategory = async () => {
    setError(null);
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");
      const apiUrl = `${BASE_URL}/api/v1/category/create`;

      const formDataApi = new FormData();
      formDataApi.append("name", formData.name);
      formDataApi.append("description", formData.description);
      if (formData.photo) {
        formDataApi.append("photo", formData.photo);
      }

      const response = await fetch(apiUrl, {
        method: "POST",
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
      setError("An error occurred while adding the category.");
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
    addCategory,
    resetForm,
  };
};

export default useAddCategory;
