// src/components/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "chart.js/auto";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiCurrencyDollar, HiUsers, HiCube } from "react-icons/hi";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Data dummy, Anda perlu menggantinya dengan data aktual dari API atau state
  const totalIncome = 15000;
  const totalCustomers = 200;
  const totalProducts = 50;

  const recentTransactions = [
    {
      id: 1,
      customerName: "John Doe",
      date: "2022-01-15",
      status: "Completed",
    },
    { id: 2, customerName: "Jane Doe", date: "2022-01-14", status: "Pending" },
    {
      id: 3,
      customerName: "Bob Smith",
      date: "2022-01-13",
      status: "Completed",
    },
  ];

  useEffect(() => {
    // Contoh data grafik penjualan (Anda perlu menggantinya dengan data aktual)
    const salesData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Penjualan Bulanan",
          data: [1000, 1500, 1200, 2000, 1800, 2500],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false, // Menonaktifkan fill area di bawah garis
        },
      ],
    };

    const salesChartCanvas = document.getElementById("salesChart");
    const salesChart = new Chart(salesChartCanvas, {
      type: "line", // Mengubah tipe chart menjadi garis
      data: salesData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                if (value % 1000 === 0) {
                  return value / 1000 + "k";
                }
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Penjualan Bulanan",
            font: {
              size: 24,
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          },
        },
      },
    });

    return () => {
      // Membersihkan chart ketika komponen unmount
      salesChart.destroy();
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="flex-shrink-0 bg-indigo-700 border-b-4 border-indigo-500">
          <div className="flex items-center p-2">
            <button
              className="text-gray-200 focus:outline-none text-2xl"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <span>&#x2261;</span> : <span>&#x2261;</span>}
            </button>
          </div>
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div className="container mx-auto px-6 py-8 bg-gray-100 rounded-md shadow-md">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
          </div>
          {/* Konten Dashboard */}
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Kartu Pendapatan */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Total Pendapatan</h2>
                  <i className="text-green-500 text-2xl">
                    <HiCurrencyDollar />
                  </i>{" "}
                </div>
                <p className="text-2xl font-bold text-green-500">
                  Rp. {totalIncome}
                </p>
              </div>

              {/* Kartu Pelanggan */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Total Pelanggan</h2>
                  <i className="text-blue-500 text-2xl">
                    <HiUsers />
                  </i>{" "}
                </div>
                <p className="text-2xl font-bold text-blue-500">
                  {totalCustomers}
                </p>
              </div>

              {/* Kartu Produk */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Total Produk</h2>
                  <i className="text-purple-500 text-2xl">
                    <HiCube />
                  </i>{" "}
                </div>
                <p className="text-2xl font-bold text-purple-500">
                  {totalProducts}
                </p>
              </div>
            </div>

            {/* Section Transaksi Terakhir */}
            <div className="bg-white p-4 rounded-md shadow-md mt-4">
              <h2 className="text-2xl font-semibold mb-4">
                Transaksi Terakhir
              </h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pelanggan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md mt-4">
              <h2 className="text-2xl font-semibold mb-4">Grafik Penjualan</h2>
              <canvas id="salesChart" width="400" height="300"></canvas>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
