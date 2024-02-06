// OrderPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";
import { Pagination } from "../../components/pagination/Pagination";
import getOrderList from "../../hooks/order/GetOrderApi";


const OrderPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [token, navigate, currentPage, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getOrderList(currentPage, 10, searchTerm);
      setOrderData(response.data);
      setTotalPages(response.pagination.total_pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order list:", error);
      setError(error.message || "Terjadi kesalahan");
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

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "UTC",
      hour12: false,
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
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
            <input
              type="text"
              placeholder="Pencarian"
              className="border px-4 py-2 rounded-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
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
                    Jumlah
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Tanggal
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Status Pesanan
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Tindakan
                  </th>
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
                    <tr key={order.id_order} className="hover:bg-gray-100">
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
