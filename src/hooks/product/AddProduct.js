import { useState } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useProductForm = () => {
  const initialFormData = {
    name: "",
    price: 0,
    description: "",
    discount: 0,
    stock: 0,
    category_id: [1],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { category_id } = formData;

  const handleChange = (name, value) => {
    // Konversi nilai menjadi number jika name adalah price, discount, atau stock
    const numericValue = ["price", "discount", "stock"].includes(name)
      ? parseInt(value, 10)
      : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  const handleCategoryChange = (categoryId) => {
    handleChange("category_id", categoryId);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = sessionStorage.getItem("token");
      const apiUrl = `${BASE_URL}/api/v1/product/create`;

      const postData = {
        ...formData,
        category_id: Array.isArray(category_id) ? category_id : [category_id],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      console.log("sending data", postData);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
        );
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message);
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
    handleCategoryChange,
    handleSubmit,
  };
};

export default useProductForm;
