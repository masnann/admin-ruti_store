import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardTotalCard from "../../components/dashboard/DashboardTotalCard";
import getLatestOrders from "../../hooks/home/GetLatestOrderApi";
import getDashboardData from "../../hooks/home/GetDashboard";
import Loading from "../../components/modals/Loading";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../components/pagination/Pagination";

const DashboardPage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [dashboardData, setDashboardData] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLatestOrders(currentPage, 10);
        setRecentTransactions(response.data);
        setTotalPages(response.pagination.total_pages);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching latest orders:", error);
        setLoading(false); 
        setError(error.message || "An error occurred");
      }
    };

    fetchData();
  }, [currentPage]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
      hour12: false,
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Menunggu Konfirmasi":
        return "text-yellow-500";
      case "Konfirmasi":
        return "text-green-500";
      case "Gagal":
        return "text-red-500";
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Dashboard
          </h1>

          {/* Section 1: Total Pendapatan, Produk, Pengguna */}
          {dashboardData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DashboardTotalCard
                title="Total Pendapatan"
                value={`Rp ${dashboardData.total_income}`}
              />
              <DashboardTotalCard
                title="Total Produk"
                value={dashboardData.total_product}
              />
              <DashboardTotalCard
                title="Total Pengguna"
                value={dashboardData.total_user}
              />
            </div>
          )}

          {/* Section 3: Transaksi Terakhir */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Transaksi Terakhir
            </h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-indigo-200">
                <tr>
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Tanggal</th>
                  <th className="border p-3">Nama Pelanggan</th>
                  <th className="border p-3">Status Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id_order} className="hover:bg-gray-100">
                    <td className="border p-3 text-center">
                      {transaction.id_order}
                    </td>
                    <td className="border p-3 text-center">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="border p-3 text-center">
                      {transaction.name}
                    </td>
                    <td
                      className={`border p-3 text-center ${getStatusColor(
                        transaction.payment_status
                      )}`}
                    >
                      {transaction.payment_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Display Pagination */}
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

export default DashboardPage;
