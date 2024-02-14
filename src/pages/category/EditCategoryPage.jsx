import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import LoadingModal from "../../components/modals/Loading";
import { useParams, useNavigate } from "react-router-dom";
import getCategoryDetails from "../../hooks/category/DetailsCategoryApi";
import updateCategory from "../../hooks/category/EditCategoryApi";

const EditCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: null,
  });
  const [formLoading, setFormLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChange = (field, file) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: file,
    }));
  };

  const handleEditCategory = async () => {
    try {
      setFormLoading(true);
      await updateCategory(id, formData);
      navigate("/category");
    } catch (error) {
      console.error("Error updating category:", error.message);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await getCategoryDetails(id);
        setFormData(response);
      } catch (error) {
        console.error("Error fetching category details:", error.message);
      }
    };
    fetchCategoryDetails();
  }, [id]);


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Edit Kategori
          </h1>

          <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-md">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-600"
              >
                Nama
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                placeholder="Enter category name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-sm font-bold text-gray-600"
              >
                Foto
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
                Deskripsi
              </label>
              <textarea
                name="description"
                id="description"
                rows="6"
                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                placeholder="Enter blog post description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            className="px-4 py-2 mt-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            onClick={handleEditCategory}
            disabled={formLoading}
          >
            {formLoading ? "Menyimpan..." : "Simpan"}
          </button>

          {formLoading && <LoadingModal />}
        </div>
      </div>
    </div>
  );
};

export default EditCategoryPage;
