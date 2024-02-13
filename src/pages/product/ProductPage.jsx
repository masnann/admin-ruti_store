import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaInfoCircle, FaPlus } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";
import { Pagination } from "../../components/pagination/Pagination";
import getProductList from "../../hooks/product/GetAll";
import DeleteConfirmationModal from "../../components/modals/Delete";
import deleteProduct from "../../hooks/product/DeleteProductApi";
import { formatDate } from "../../utils/FormatDate";

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productData, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getProductList(currentPage, 10);
        setProducts(response.data);
        setTotalPages(response.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching product list:", error.message);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await getProductList(1, 10, searchTerm);
      setProducts(response.data);
      setTotalPages(response.pagination.total_pages);
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product list:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    navigate(`/products/detail/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      setLoading(true);

      // Call the deleteProduct function to delete the product
      await deleteProduct(deleteProductId);

      // After successful deletion, fetch the updated product list
      await fetchData();

      setLoading(false);
      setIsDeleteModalOpen(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error deleting product:", error.message);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDetails = (id) => {
    console.log(`Details button clicked for ID ${id}`);
  };

  const handleAddProduct = () => {
    navigate("/products/create");
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Produk
          </h1>

          {/* Display Products Table */}
          <div className="overflow-x-auto mt-2">
            <div className="flex justify-between items-center">
              <button
                className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 flex items-center"
                onClick={() => handleAddProduct()}
              >
                <FaPlus className="mr-2" />
                Tambah Produk
              </button>

              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  className="border px-4 py-2 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Cari
                </button>
              </form>
            </div>

            <table className="min-w-full bg-white border border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="border p-3 bg-gray-300 text-gray-700">Nama</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Harga
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Rating
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Total Ulasan
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Stok</th>
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
                    <td colSpan="10" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4 text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                ) : (
                  productData.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-100">
                      <td className="border p-3">{product.name}</td>
                      <td className="border p-3 text-center">
                        Rp. {product.price}
                      </td>
                      <td className="border p-3 text-center">
                        {product.rating}
                      </td>
                      <td className="border p-3 text-center">
                        {product.total_reviews}
                      </td>
                      <td className="border p-3 text-center">
                        {product.stock}
                      </td>
                      <td className="border p-3 text-center">
                        {formatDate(product.created_at)}
                      </td>
                      <td className="border p-3 text-center">
                        {product.photos.length > 0 ? (
                          <div className="flex justify-center items-center">
                            <img
                              src={product.photos[0].url}
                              alt={`Product-${product.id}`}
                              className="w-12 h-12 object-cover"
                            />
                          </div>
                        ) : (
                          "No Photo"
                        )}
                      </td>

                      <td className="border p-3 text-center">
                        <button
                          className="mr-2 text-purple-600 hover:text-purple-900"
                          onClick={() => handleEdit(product.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="mr-2 text-blue-600 hover:text-blue-900"
                          onClick={() => handleDetails(product.id)}
                        >
                          <FaInfoCircle />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(product.id)}
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
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirmation}
      />
    </div>
  );
};

export default ProductPage;
