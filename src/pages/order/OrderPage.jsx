// OrderPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";
import { Pagination } from "../../components/pagination/Pagination";
import getOrderList from "../../hooks/order/GetOrderApi";
import { formatDate } from "../../utils/FormatDate";

const OrderPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        const response = await getOrderList(currentPage, 10);
        setOrderData(response.data);
        setTotalPages(response.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order list:", error);
        setError(error.message || "Terjadi kesalahan");
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await getOrderList(1, 10, searchTerm);
      setOrderData(response.data);
      setTotalPages(response.pagination.total_pages);
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order list:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDetails = (id) => {
    navigate(`/orders/details/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Pesanan
          </h1>
          <div className="flex justify-end">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Cari pelanggan..."
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

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 mt-4">
              <thead>
                <tr>
                  <th className="border p-3 bg-gray-300 text-gray-700">ID</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Pelanggan
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Total Bayar
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Tanggal
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Status Pesanan
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Memuat...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                ) : (
                  orderData.map((order) => (
                    <tr
                      key={order.id_order}
                      className="hover:bg-gray-100 text-center"
                    >
                      <td className="border p-3">{order.id_order}</td>
                      <td className="border p-3">{order.name}</td>
                      <td className="border p-3">
                        Rp. {order.total_amount_paid}
                      </td>
                      <td className="border p-3 text-center">
                        {formatDate(order.date)}
                      </td>
                      <td className="border p-3">{order.order_status}</td>
                      <td className="border p-3 text-center">
                        <button
                          className="mr-2 text-blue-600 hover:text-blue-900"
                          onClick={() => handleDetails(order.id)}
                        >
                          <FaInfoCircle />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Tampilkan Paginasi */}
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

export default OrderPage;
