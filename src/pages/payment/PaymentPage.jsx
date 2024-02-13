// PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiDownload } from "react-icons/hi";
import Sidebar from "../../components/sidebar/Sidebar";
import { Pagination } from "../../components/pagination/Pagination";
import getPaymentList from "../../hooks/payment/GetPaymentApi";
import Calendar from "../../components/calender/Calendar";
import { formatDate } from "../../utils/FormatDate";

const PaymentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
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
        const response = await getPaymentList(currentPage, 10);
        setPaymentData(response.data);
        setTotalPages(response.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment list:", error);
        setError(error.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await getPaymentList(1, 10, searchTerm);
      setPaymentData(response.data);
      setTotalPages(response.pagination.total_pages);
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payment list:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDownloadReport = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Pembayaran
          </h1>
          <div className="flex justify-between items-center">
            <div>
              <button
                className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 flex items-center"
                onClick={() => handleDownloadReport()}
              >
                <HiDownload className="mr-2" />
                Unduh Laporan
              </button>
            </div>
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

          {/* Display Payment Table */}
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
                    Status Pembayaran
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                ) : (
                  paymentData.map((payment) => (
                    <tr
                      key={payment.id_order}
                      className="hover:bg-gray-100 text-center"
                    >
                      <td className="border p-3">{payment.id_order}</td>
                      <td className="border p-3">{payment.name}</td>
                      <td className="border p-3">
                        Rp. {payment.total_amount_paid}
                      </td>
                      <td className="border p-3">{formatDate(payment.date)}</td>
                      <td className="border p-3">{payment.payment_status}</td>
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

          {/* Menampilkan kalender jika state showCalendar bernilai true */}
          {showCalendar && <Calendar onClose={handleCloseCalendar} />}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
