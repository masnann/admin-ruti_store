// src/hooks/article/CreateBlogPost.js
import { useState } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useCreateBlogPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
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

  const createBlogPost = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");
      const apiUrl = `${BASE_URL}/api/v1/article/create`;

      const formDataApi = new FormData();
      formDataApi.append("title", formData.title);
      formDataApi.append("content", formData.content);

      if (formData.photo) {
        // Append the file only if it exists
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
      setError("An error occurred while saving the blog post.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    success,
    handleChange,
    handleFileChange,
    createBlogPost,
    resetForm: () => {
      setFormData({
        title: "",
        content: "",
        photo: null,
      });
      setSuccess(false);
      setError(null);
    },
  };
};

export default useCreateBlogPost;
