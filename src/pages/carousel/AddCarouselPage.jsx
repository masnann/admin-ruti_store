import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import useAddCarousel from "../../hooks/home/AddCarousel"; 
import { useNavigate } from "react-router-dom";

const AddCarouselPage = () => {
  const navigate = useNavigate();
  const {
    formData,
    loading,
    success,
    handleChange,
    handleFileChange,
    addCarousel, // Change to addCarousel if that's the hook you have for adding carousel items
  } = useAddCarousel(); // Change to useAddCarousel if that's the hook you have for adding carousel items

  // State variable to store alert messages
  const [nameAlert, setNameAlert] = useState("");

  useEffect(() => {
    if (success) {
      navigate("/carousel");
    }
  }, [success, navigate]);

  const [photoAlert, setPhotoAlert] = useState("");

  const handleAddCarousel = async () => {
    // Reset alerts before validation
    setNameAlert("");
    setPhotoAlert("");

    // Form validation before submission
    if (!formData.name) {
      setNameAlert("Please fill in the carousel name.");
    }

    if (!formData.photo) {
      setPhotoAlert("Please select a photo for the carousel.");
    }

    // Send data only if all fields are filled
    if (formData.name && formData.photo) {
      await addCarousel();
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Tambah Carousel
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
                className={`mt-1 p-2 w-full border rounded-md bg-gray-100 ${
                  nameAlert ? "border-red-500" : ""
                }`}
                placeholder="Masukan nama carousel"
                value={formData.name}
                onChange={(e) => {
                  handleChange("name", e.target.value);
                  setNameAlert(""); // Reset alert on every input change
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
                Foto
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                className={`mt-1 p-2 w-full border rounded-md bg-gray-100 ${
                  photoAlert ? "border-red-500" : ""
                }`}
                onChange={(e) => {
                  handleFileChange("photo", e.target.files[0]);
                  setPhotoAlert(""); // Reset alert on every file change
                }}
              />
              {photoAlert && (
                <p className="text-red-500 text-sm mt-1">{photoAlert}</p>
              )}
            </div>
          </div>

          <button
            className="px-4 py-2 mt-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            onClick={handleAddCarousel}
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCarouselPage;
