import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import useAddCategory from "../../hooks/category/AddCategory";
import { useNavigate } from "react-router-dom";

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const {
    formData,
    loading,
    success,
    handleChange,
    handleFileChange,
    addCategory,
  } = useAddCategory();

  // State variable untuk menyimpan pesan alert
  const [nameAlert, setNameAlert] = useState("");
  const [descriptionAlert, setDescriptionAlert] = useState("");

  useEffect(() => {
    if (success) {
      navigate("/category");
    }
  }, [success, navigate]);

  const handleAddCategory = async () => {
    // Reset alert sebelum validasi
    setNameAlert("");
    setDescriptionAlert("");

    // Validasi form sebelum pengiriman
    if (!formData.name) {
      setNameAlert("Please fill in the category name.");
    }

    if (!formData.description) {
      setDescriptionAlert("Please fill in the category description.");
    }

    // Kirim data hanya jika semua field terisi
    if (formData.name && formData.description) {
      await addCategory();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Add Category
          </h1>

          <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-md">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={`mt-1 p-2 w-full border rounded-md bg-gray-100 ${
                  nameAlert ? "border-red-500" : ""
                }`}
                placeholder="Enter category name"
                value={formData.name}
                onChange={(e) => {
                  handleChange("name", e.target.value);
                  setNameAlert(""); // Reset alert setiap kali ada perubahan di input
                }}
                required
              />
              {nameAlert && (
                <p className="text-red-500 text-sm mt-1">{nameAlert}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-sm font-bold text-gray-600"
              >
                Photo
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                onChange={(e) => handleFileChange("photo", e.target.files[0])}
              />
            </div>

            <div className="mb-4 col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-bold text-gray-600"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="6"
                className={`mt-1 p-2 w-full border rounded-md bg-gray-100 ${
                  descriptionAlert ? "border-red-500" : ""
                }`}
                placeholder="Enter category description"
                value={formData.description}
                onChange={(e) => {
                  handleChange("description", e.target.value);
                  setDescriptionAlert(""); // Reset alert setiap kali ada perubahan di input
                }}
                required
              ></textarea>
              {descriptionAlert && (
                <p className="text-red-500 text-sm mt-1">
                  {descriptionAlert}
                </p>
              )}
            </div>
          </div>

          <button
            className="px-4 py-2 mt-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            onClick={handleAddCategory}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPage;
