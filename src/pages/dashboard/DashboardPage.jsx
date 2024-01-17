// DashboardPage.jsx
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import useDashboardData from "../../hooks/home/GetDashboard";
import DashboardTotalCard from "../../components/dashboard/DashboardTotalCard";
import DashboardBarChart from "../../components/dashboard/DashboardBarChart";

const DashboardPage = () => {
  const { dashboardData, loading, error } = useDashboardData(
    sessionStorage.getItem("token")
  );

  const recentTransactions = [
    { id: 1, date: "2024-01-10", customer: "John Doe", status: "Selesai" },
    { id: 2, date: "2024-01-09", customer: "Jane Doe", status: "Dalam Proses" },
  ];

  const ordersPerWeek = [
    { week: "Week 1", total: 25 },
    { week: "Week 2", total: 40 },
    { week: "Week 3", total: 35 },
    { week: "Week 4", total: 50 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Dashboard
          </h1>

          {/* Section 1: Total Pendapatan, Produk, Pengguna */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardTotalCard
              title="Total Pendapatan"
              value={`Rp ${dashboardData?.data?.total_income}`}
            />
            <DashboardTotalCard
              title="Total Produk"
              value={dashboardData?.data?.total_product}
            />
            <DashboardTotalCard
              title="Total Pengguna"
              value={dashboardData?.data?.total_user}
            />
          </div>

          {/* Section 2: Grafik Pesanan Per Minggu */}
          <DashboardBarChart data={ordersPerWeek} />

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
                  <th className="border p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-100">
                    <td className="border p-3">{transaction.id}</td>
                    <td className="border p-3">{transaction.date}</td>
                    <td className="border p-3">{transaction.customer}</td>
                    <td className="border p-3">{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
