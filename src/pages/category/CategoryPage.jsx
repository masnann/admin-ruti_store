import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaInfoCircle, FaPlus } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";
import { Pagination } from "../../components/pagination/Pagination";
import useCategoryData from "../../hooks/category/GetAll";
import useDeleteCategory from "../../hooks/category/DeleteCategory";
import DeleteConfirmationModal from "../../components/modals/Delete";
import { formatDate } from "../../utils/FormatDate";

const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { categoryData, loading, error, totalPages } = useCategoryData(
    currentPage,
    itemsPerPage,
    token
  );

  const { deleteCategory, resetDeleteState } = useDeleteCategory();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    navigate(`/category/edit/${id}`);
  };

  const handleDelete = (id) => {
    setCategoryToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteCategory(categoryToDelete);
    resetDeleteState();
    setShowDeleteModal(false);

    window.location.reload();
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
    setShowDeleteModal(false);
  };

  const handleAddCategory = () => {
    navigate(`/category/create`);
  };

  const truncateDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return description;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Kategori
          </h1>

          <div className="overflow-x-auto">
            <button
              className="px-10 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 flex items-center"
              onClick={handleAddCategory}
            >
              <FaPlus className="mr-2" />
              Tambah Kategori
            </button>

            <table className="min-w-full bg-white border border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="border p-3 bg-gray-300 text-gray-700">Nama</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Deskripsi
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Foto</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Dibuat Pada
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Memuat...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                ) : (
                  categoryData.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-100">
                      <td className="border p-3">{category.name}</td>
                      <td className="border p-3">{truncateDescription(category.description, 8)}</td>
                      <td className="border p-3">
                        {category.photo ? (
                          <img
                            src={category.photo}
                            alt={`Photo for ${category.name}`}
                            className="w-12 h-12 object-cover"
                          />
                        ) : (
                          <p className="text-gray-800">
                            Tidak ada foto tersedia
                          </p>
                        )}
                      </td>
                      <td className="border p-3">
                        {formatDate(category.created_at)}
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          className="mr-2 text-purple-600 hover:text-purple-900"
                          onClick={() => handleEdit(category.id)}
                        >
                          <FaEdit />
                        </button>
                        {/* <button
                          className="mr-2 text-blue-600 hover:text-blue-900"
                          onClick={() => handleDetails(category.id)}
                        >
                          <FaInfoCircle />
                        </button> */}
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(category.id)}
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

          <div className="mt-8">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Modal for Delete Confirmation */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default CategoryPage;
