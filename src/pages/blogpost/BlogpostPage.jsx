// pages/blogpost/BlogpostPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaInfoCircle, FaPlus } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";
import { Pagination } from "../../components/pagination/Pagination";
import useArticleData from "../../hooks/article/GetAll";
import useDeleteArticle from "../../hooks/article/DeleteBlogpost";
import DeleteConfirmationModal from "../../components/modals/Delete";
import { formatDate } from "../../utils/FormatDate";

const ArticlePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { articleData, loading, error, totalPages } = useArticleData(
    currentPage,
    itemsPerPage,
    token
  );

  const { deleteArticle, deleteSuccess, deleteError, resetDeleteState } =
    useDeleteArticle();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    navigate(`/blog-posts/edit/${id}`);
  };

  const handleDelete = (id) => {
    setArticleToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteArticle(articleToDelete);
    resetDeleteState(); // Reset delete state after handling

    // Close the modal after handling delete

    setShowDeleteModal(false);

    window.location.reload();
  };

  const handleCancelDelete = () => {
    // Reset state and close the modal
    setArticleToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDetails = (id) => {
    navigate(`/blog-posts/details/${id}`);
  };

  const handleAddBlogpost = () => {
    navigate("/blog-posts/create");
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
            Artikel
          </h1>

          <div className="overflow-x-auto">
            <button
              className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 flex items-center"
              onClick={handleAddBlogpost}
            >
              <FaPlus className="mr-2" />
              Tambah Artikel
            </button>

            <table className="min-w-full bg-white border border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Judul
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Penulis
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Dibuat Pada
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Foto</th>
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
                  articleData.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-100">
                      <td className="border p-3">
                        {truncateDescription(article.title, 5)}
                      </td>
                      <td className="border p-3 text-center">
                        {article.author}
                      </td>
                      <td className="border p-3 text-center">
                        {formatDate(article.created_at)}
                      </td>
                      <td className="border p-3 text-center">
                        {article.photo ? (
                          <div className="flex justify-center items-center">
                            <img
                              src={article.photo}
                              alt={`Photo for ${article.title}`}
                              className="w-12 h-12 object-cover"
                            />
                          </div>
                        ) : (
                          <p className="text-gray-800">Tidak ada foto</p>
                        )}
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          className="mr-2 text-purple-600 hover:text-purple-900"
                          onClick={() => handleEdit(article.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="mr-2 text-blue-600 hover:text-blue-900"
                          onClick={() => handleDetails(article.id)}
                        >
                          <FaInfoCircle />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(article.id)}
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

export default ArticlePage;
