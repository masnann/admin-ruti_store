import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import LoadingModal from "../../components/modals/Loading";
import { useParams, useNavigate } from "react-router-dom";
import getCarouselDetails from "../../hooks/home/DetailCarouselApi";
import updateCarousel from "../../hooks/home/EditCarouselApi";

const EditCarouselPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  const handleEditCarousel = async () => {
    try {
      setFormLoading(true);
      await updateCarousel(id, formData);
      navigate("/carousel");
    } catch (error) {
      console.error("Error updating carousel:", error.message);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    const fetchCarouselDetails = async () => {
      try {
        const response = await getCarouselDetails(id);
        setFormData(response);
      } catch (error) {
        console.error("Error fetching carousel details:", error.message);
      }
    };
    fetchCarouselDetails();
  }, [id]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Edit Carousel
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
          </div>

          <button
            className="px-4 py-2 mt-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            onClick={handleEditCarousel}
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

export default EditCarouselPage;
