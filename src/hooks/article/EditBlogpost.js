// src/hooks/article/EditBlogPost.js
import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useEditBlogPost = (postId) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchBlogPostData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const apiUrl = `${BASE_URL}/api/v1/article/details/${postId}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const postData = await response.json();

      // Set the form data with existing post data
      setFormData({
        title: postData.title,
        content: postData.content,
        // You may need to adjust this depending on the structure of your API response
        photo: postData.photo ? postData.photo : null,
      });
    } catch (error) {
      setError("An error occurred while fetching post data.");
    }
  };

  // Initial fetch when the hook is called
  useEffect(() => {
    fetchBlogPostData();
  }, []);

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

  const editBlogPost = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");
      const apiUrl = `${BASE_URL}/api/v1/article/update/${postId}`;

      const formDataApi = new FormData();
      formDataApi.append("title", formData.title);
      formDataApi.append("content", formData.content);

      if (formData.photo) {
        // Append the file only if it exists
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
      setError("An error occurred while updating the blog post.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
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
    editBlogPost,
    resetForm,
    fetchBlogPostData,
  };
};

export default useEditBlogPost;
