// src/pages/carousel/CarouselPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaInfoCircle, FaPlus } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";
import { Pagination } from "../../components/pagination/Pagination";
import useCarouselData from "../../hooks/home/GetAllCarousel";

const CarouselPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { carouselData, loading, error, totalPages, itemsPerPage } = useCarouselData(
    currentPage,
    token
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    console.log(`Edit button clicked for ID ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete button clicked for ID ${id}`);
  };

  const handleDetails = (id) => {
    console.log(`Details button clicked for ID ${id}`);
  };

  const handleAddCarousel = () => {
    navigate("/carousel/create");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Carousel
          </h1>

          {/* Display Carousel Table */}
          <div className="overflow-x-auto mt-2">
            <button
              className="px-10 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 flex items-center"
              onClick={() => handleAddCarousel()}
            >
              <FaPlus className="mr-2" />
              Tambah Carousel
            </button>

            <table className="min-w-full bg-white border border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="border p-3 bg-gray-300 text-gray-700">Title</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Image URL</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                ) : (
                  carouselData.map((carousel) => (
                    <tr key={carousel.id} className="hover:bg-gray-100">
                      <td className="border p-3">{carousel.name}</td>
                      <td className="border p-3 text-center">
                        {carousel.photo ? (
                          <img
                            src={carousel.photo}
                            alt={`Photo for ${carousel.name}`}
                            className="w-12 h-12 object-cover"
                          />
                        ) : (
                          <p className="text-gray-800">No photo available</p>
                        )}
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          className="mr-2 text-purple-600 hover:text-purple-900"
                          onClick={() => handleEdit(carousel.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(carousel.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Display Pagination */}
          <div className="mt-8">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselPage;
